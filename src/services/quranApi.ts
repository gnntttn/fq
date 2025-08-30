import axios from 'axios';
import { Surah, Verse, Reciter, SearchResult, JuzInfo } from '../types/quran';
import { curatedReciterIds } from '../data/curatedReciters';

const API_BASE_URL = 'https://api.quran.com/api/v4';
const CACHE_PREFIX = 'quran_api_cache_v4_'; // Updated cache version
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CacheItem<T> {
  timestamp: number;
  data: T;
}

const getCache = <T>(key: string): T | null => {
  const itemStr = localStorage.getItem(`${CACHE_PREFIX}${key}`);
  if (!itemStr) {
    return null;
  }
  try {
    const item: CacheItem<T> = JSON.parse(itemStr);
    if (Date.now() - item.timestamp > CACHE_EXPIRY_MS) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }
    return item.data;
  } catch (error) {
    console.error(`Error reading cache for key "${key}":`, error);
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    return null;
  }
};

const setCache = <T>(key: string, data: T) => {
  try {
    const item: CacheItem<T> = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(item));
  } catch (error) {
    console.error(`Error setting cache for key "${key}":`, error);
     if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        console.warn("Local storage quota exceeded. Clearing old cache...");
        localStorage.clear(); 
    }
  }
};

class QuranApiService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
  });

  private mapVerse(verse: any): Verse {
    return {
      id: verse.id,
      verseKey: verse.verse_key,
      verseNumber: verse.verse_number,
      textUthmani: verse.text_uthmani,
      textSimple: verse.text_simple,
      translations: verse.translations?.map((t: any) => ({
        id: t.id,
        resource_id: parseInt(t.resource_id, 10),
        text: t.text,
        resourceName: t.resource_name,
        languageName: t.language_name,
      })),
      audio: verse.audio ? {
        url: verse.audio.url,
        duration: verse.audio.duration,
      } : undefined,
      page: verse.page_number,
      juz: verse.juz_number,
      hizb: verse.hizb_number,
    };
  }

  async getSurahs(): Promise<Surah[]> {
    const cacheKey = 'surahs_list_with_pages';
    const cachedSurahs = getCache<Surah[]>(cacheKey);
    if (cachedSurahs) {
      return cachedSurahs;
    }

    try {
      const response = await this.api.get('/chapters?language=ar');
      const surahs: Surah[] = response.data.chapters.map((chapter: any) => ({
        id: chapter.id,
        name: chapter.name_simple,
        nameArabic: chapter.name_arabic,
        nameEnglish: chapter.name_simple,
        versesCount: chapter.verses_count,
        type: chapter.revelation_place === 'makkah' ? 'meccan' : 'medinan',
        bismillahPre: chapter.bismillah_pre,
        pages: chapter.pages,
      }));
      setCache(cacheKey, surahs);
      return surahs;
    } catch (error) {
      console.error('Error fetching surahs:', error);
      return [];
    }
  }

  async getSurah(surahId: number): Promise<Surah | null> {
    const surahs = await this.getSurahs();
    return surahs.find(s => s.id === surahId) || null;
  }

  async getVersesByPage(pageNumber: number, options?: { translations?: string; audio?: string; }, forceRefetch = false): Promise<{ verses: Verse[], meta: any }> {
    const cacheKey = `page_${pageNumber}_${options?.translations || ''}_${options?.audio || ''}`;
    if (!forceRefetch) {
      const cachedData = getCache<{ verses: Verse[], meta: any }>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    try {
      const params = new URLSearchParams();
      if (options?.translations) params.append('translations', options.translations);
      if (options?.audio) params.append('audio', options.audio);
      params.append('fields', 'text_uthmani,page_number,juz_number');
      
      const response = await this.api.get(`/verses/by_page/${pageNumber}`, { params });
      const verses = response.data.verses.map(this.mapVerse);
      const meta = response.data.meta;
      
      const dataToCache = { verses, meta };
      setCache(cacheKey, dataToCache);
      
      return dataToCache;
    } catch (error) {
      console.error(`Error fetching verses for page ${pageNumber}:`, error);
      throw error;
    }
  }

  async getAllVersesBySurah(surahId: number, options?: { translations?: string; audio?: string; }): Promise<Verse[]> {
    const cacheKey = `surah_verses_${surahId}_${options?.translations || ''}_${options?.audio || ''}`;
    const cachedVerses = getCache<Verse[]>(cacheKey);
    if (cachedVerses) {
      return cachedVerses;
    }

    try {
      const params = new URLSearchParams();
      if (options?.translations) params.append('translations', options.translations);
      if (options?.audio) params.append('audio', options.audio);
      params.append('fields', 'text_uthmani,text_simple,page_number,juz_number,audio');
      params.append('per_page', 'all');

      const response = await this.api.get(`/verses/by_chapter/${surahId}`, { params });
      const verses = response.data.verses.map(this.mapVerse);
      setCache(cacheKey, verses);
      return verses;
    } catch (error) {
      console.error(`Error fetching verses for surah ${surahId}:`, error);
      return [];
    }
  }

  async getJuzInfo(juzId: number): Promise<JuzInfo | null> {
    const cacheKey = `juz_info_${juzId}`;
    const cachedData = getCache<JuzInfo>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response = await this.api.get(`/juzs/${juzId}`);
      const juzInfo = response.data.juz;
      setCache(cacheKey, juzInfo);
      return juzInfo;
    } catch (error) {
      console.error(`Error fetching info for Juz ${juzId}:`, error);
      return null;
    }
  }

  async getVersesByJuz(juzId: number, options?: { translations?: string; audio?: string; }): Promise<Verse[]> {
    const cacheKey = `juz_verses_v2_${juzId}_${options?.translations || ''}_${options?.audio || ''}`;
    const cachedVerses = getCache<Verse[]>(cacheKey);
    if (cachedVerses) {
      return cachedVerses;
    }

    try {
      const juzInfo = await this.getJuzInfo(juzId);
      if (!juzInfo) {
        throw new Error(`Could not fetch info for Juz ${juzId}`);
      }

      const versePromises: Promise<Verse[]>[] = [];

      for (const surahIdStr in juzInfo.verse_mapping) {
        const surahId = parseInt(surahIdStr, 10);
        const verseRange = juzInfo.verse_mapping[surahIdStr];
        const [startVerse, endVerse] = verseRange.split('-').map(Number);
        
        const promise = this.getAllVersesBySurah(surahId, options).then(surahVerses => 
          surahVerses.filter(v => v.verseNumber >= startVerse && v.verseNumber <= endVerse)
        );
        versePromises.push(promise);
      }

      const results = await Promise.all(versePromises);
      const allVerses = results.flat();
      
      setCache(cacheKey, allVerses);
      return allVerses;

    } catch (error) {
      console.error(`Error fetching verses for Juz ${juzId}:`, error);
      return [];
    }
  }

  async getVerseByKey(verseKey: string, options?: { translations?: string; audio?: string; }): Promise<{ verse: Verse } | null> {
    try {
        const params = new URLSearchParams();
        if (options?.translations) params.append('translations', options.translations);
        if (options?.audio) params.append('audio', options.audio);
        params.append('fields', 'text_uthmani,text_simple,page_number,juz_number,audio');

        const response = await this.api.get(`/verses/by_key/${verseKey}`, { params });
        const verseData = response.data.verse;
        return {
            verse: this.mapVerse(verseData)
        };
    } catch (error) {
        console.error(`Error fetching verse by key ${verseKey}:`, error);
        return null;
    }
  }

  async getReciters(): Promise<Reciter[]> {
    const cacheKey = 'reciters_list_curated_v2'; // Busting the cache by changing key
    const cachedData = getCache<Reciter[]>(cacheKey);
    if(cachedData) return cachedData;

    try {
      const response = await this.api.get('/resources/recitations?language=ar');
      const allReciters: Reciter[] = response.data.recitations.map((reciter: any) => ({
        id: reciter.id,
        name: reciter.reciter_name,
        nameArabic: reciter.translated_name.name,
        style: reciter.style,
      }));

      const curatedReciters = allReciters.filter(reciter => 
        curatedReciterIds.includes(reciter.id)
      );

      setCache(cacheKey, curatedReciters);
      return curatedReciters;
    } catch (error) {
      console.error('Error fetching reciters:', error);
      return [];
    }
  }

  async searchVerses(query: string, options?: {
    size?: number;
    page?: number;
    translation?: string;
  }): Promise<SearchResult[]> {
    try {
      const params = new URLSearchParams();
      params.append('q', query);
      if (options?.size) params.append('size', options.size.toString());
      if (options?.page) params.append('page', options.page.toString());
      if (options?.translation) params.append('translation', options.translation);

      const response = await this.api.get(`/search?${params}`);
      
      const surahs = await this.getSurahs();
      const surahMap = new Map(surahs.map(s => [s.id, s]));

      return response.data.search.results.map((result: any) => {
        const surahId = parseInt(result.verse_key.split(':')[0]);
        const surah = surahMap.get(surahId);

        return {
          verse: {
            id: result.verse_id,
            verseKey: result.verse_key,
            verseNumber: parseInt(result.verse_key.split(':')[1]),
            textUthmani: result.text,
            textSimple: result.text,
            translations: result.translations?.map((t: any) => ({ text: t.text, resourceName: t.name })),
            page: 0, // Page number is not available in search results, will fetch on click
          },
          surah: {
            id: surahId,
            name: surah?.nameEnglish || '',
            nameArabic: surah?.nameArabic || '',
            nameEnglish: surah?.nameEnglish || '',
            versesCount: surah?.versesCount || 0,
            type: surah?.type || 'meccan',
            pages: surah?.pages || [0,0],
            bismillahPre: surah?.bismillahPre || false,
          },
          highlights: result.highlighted || [],
        }
      });
    } catch (error) {
      console.error('Error searching verses:', error);
      return [];
    }
  }
}

export const quranApi = new QuranApiService();

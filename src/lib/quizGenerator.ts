import { Surah } from '../types/quran';
import { AsmaulHusna } from '../types/asmaulhusna';
import { ProphetStory } from '../types/prophetStory';
import { TranslationKey } from './i18n';

export interface GeneratedQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface AppData {
  surahs: Surah[];
  asmaulHusna: AsmaulHusna[];
  prophetStories: ProphetStory[];
  t: (key: TranslationKey, replacements?: { [key: string]: string | number }) => string;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getRandomItems = <T extends { id: any }>(array: T[], count: number, exclude: T[] = []): T[] => {
  const excludeIds = new Set(exclude.map(e => e.id));
  const filteredArray = array.filter(item => !excludeIds.has(item.id));
  return shuffleArray(filteredArray).slice(0, count);
};

// --- Generator Functions ---

function generateSurahVerseCountQuestion({ surahs, t }: AppData): GeneratedQuizQuestion | null {
  if (surahs.length < 4) return null;
  const selected = getRandomItems(surahs, 4);
  if (selected.length < 4) return null;

  const optionsAsNumbers = selected.map(s => s.versesCount);
  if (new Set(optionsAsNumbers).size < 4) return null;

  const [correctSurah, ...wrongSurahs] = selected;
  
  const correctAnswer = String(correctSurah.versesCount);
  const options = shuffleArray([
    correctAnswer,
    ...wrongSurahs.map(s => String(s.versesCount))
  ]);

  if (options.some(opt => typeof opt !== 'string')) return null;

  return {
    question: t('quiz_q_verse_count', { surahName: correctSurah.nameArabic }),
    options,
    correctAnswer,
    explanation: t('quiz_exp_verse_count', { surahName: correctSurah.nameArabic, count: correctAnswer }),
  };
}

function generateSurahTypeQuestion({ surahs, t }: AppData): GeneratedQuizQuestion | null {
    if (surahs.length < 1) return null;
    const surah = getRandomItems(surahs, 1)[0];
    const correctType = surah.type === 'meccan' ? t('filter_meccan') : t('filter_medinan');
    
    if (typeof correctType !== 'string') return null;

    return {
        question: t('quiz_q_surah_type', { surahName: surah.nameArabic }),
        options: [t('filter_meccan'), t('filter_medinan')],
        correctAnswer: correctType,
        explanation: t('quiz_exp_surah_type', { surahName: surah.nameArabic, type: correctType })
    };
}

function generateAsmaulHusnaMeaningQuestion({ asmaulHusna, t }: AppData): GeneratedQuizQuestion | null {
  if (asmaulHusna.length < 4) return null;
  
  const selected = getRandomItems(asmaulHusna, 4);
  if (selected.length < 4) return null;

  const [correctName, ...wrongNames] = selected;
  
  const correctAnswer = String(correctName.meaning_ar);
  const options = shuffleArray([
    correctAnswer, 
    ...wrongNames.map(n => String(n.meaning_ar))
  ]);
  
  if (options.some(opt => typeof opt !== 'string')) return null;

  return {
    question: t('quiz_q_asmaulhusna', { name: correctName.name }),
    options,
    correctAnswer,
    explanation: t('quiz_exp_asmaulhusna', { name: correctName.name, meaning: correctAnswer }),
  };
}

function generateProphetStorySurahQuestion({ prophetStories, surahs, t }: AppData): GeneratedQuizQuestion | null {
    if (prophetStories.length < 1 || surahs.length < 4) return null;

    const story = getRandomItems(prophetStories, 1)[0];
    const correctSurahId = parseInt(story.verses[0].split(':')[0], 10);
    const correctSurah = surahs.find(s => s.id === correctSurahId);
    if (!correctSurah) return null;

    const wrongSurahs = getRandomItems(surahs, 3, [correctSurah]);
    if (wrongSurahs.length < 3) return null;

    const correctAnswer = String(correctSurah.nameArabic);
    const options = shuffleArray([
        correctAnswer,
        ...wrongSurahs.map(s => String(s.nameArabic))
    ]);

    if (options.some(opt => typeof opt !== 'string')) return null;

    return {
        question: t('quiz_q_prophet_story', { prophetName: t(story.nameKey) }),
        options,
        correctAnswer,
        explanation: t('quiz_exp_prophet_story', { prophetName: t(story.nameKey), surahName: correctAnswer })
    };
}

// --- Main Export ---

export const generateQuizQuestions = (count: number, data: AppData): GeneratedQuizQuestion[] => {
  const questions: GeneratedQuizQuestion[] = [];
  const questionGenerators = [
    generateSurahVerseCountQuestion,
    generateSurahTypeQuestion,
    generateAsmaulHusnaMeaningQuestion,
    generateProphetStorySurahQuestion,
  ];

  if (data.surahs.length < 4 || data.asmaulHusna.length < 4 || data.prophetStories.length < 1) {
    console.error("Not enough data to generate quiz questions.");
    return [];
  }

  const usedQuestions = new Set<string>();
  let attempts = 0; // Prevent infinite loop

  while (questions.length < count && attempts < 100) {
    attempts++;
    const generatorIndex = Math.floor(Math.random() * questionGenerators.length);
    const generator = questionGenerators[generatorIndex];
    
    try {
      const question = generator(data);
      
      if (question && !usedQuestions.has(question.question)) {
        const allOptionsAreStrings = question.options.every(opt => typeof opt === 'string' && opt.trim() !== '');
        const correctAnswerIsString = typeof question.correctAnswer === 'string' && question.correctAnswer.trim() !== '';
        
        if (allOptionsAreStrings && correctAnswerIsString && question.options.includes(question.correctAnswer)) {
          if (new Set(question.options).size === question.options.length) {
              questions.push(question);
              usedQuestions.add(question.question);
          }
        }
      }
    } catch (error) {
      console.error("Error in quiz generator:", error);
    }
  }

  return questions;
};

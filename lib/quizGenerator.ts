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

const getRandomItems = <T,>(array: T[], count: number, exclude: T[] = []): T[] => {
  const filteredArray = array.filter(item => !exclude.includes(item));
  return shuffleArray(filteredArray).slice(0, count);
};

export const generateQuizQuestions = (count: number, data: AppData): GeneratedQuizQuestion[] => {
  const { surahs, asmaulHusna, prophetStories, t } = data;
  const questions: GeneratedQuizQuestion[] = [];
  const questionGenerators = [
    generateSurahVerseCountQuestion,
    generateSurahTypeQuestion,
    generateAsmaulHusnaMeaningQuestion,
    generateProphetStorySurahQuestion, // This is simplified
  ];

  while (questions.length < count) {
    const generator = questionGenerators[Math.floor(Math.random() * questionGenerators.length)];
    const question = generator(data);
    if (question) {
      questions.push(question);
    }
  }

  return questions;
};

function generateSurahVerseCountQuestion({ surahs, t }: AppData): GeneratedQuizQuestion | null {
  if (surahs.length < 4) return null;
  const correctSurah = getRandomItems(surahs, 1)[0];
  const wrongOptions = getRandomItems(surahs, 3, [correctSurah]).map(s => s.versesCount.toString());
  
  const options = shuffleArray([correctSurah.versesCount.toString(), ...wrongOptions]);
  const correctAnswer = correctSurah.versesCount.toString();

  return {
    question: `كم عدد آيات سورة ${correctSurah.nameArabic}؟`,
    options,
    correctAnswer,
    explanation: `سورة ${correctSurah.nameArabic} تحتوي على ${correctAnswer} آية.`,
  };
}

function generateSurahTypeQuestion({ surahs, t }: AppData): GeneratedQuizQuestion | null {
    if (surahs.length < 1) return null;
    const surah = getRandomItems(surahs, 1)[0];
    const correctType = surah.type === 'meccan' ? t('filter_meccan') : t('filter_medinan');
    const wrongType = surah.type === 'meccan' ? t('filter_medinan') : t('filter_meccan');

    return {
        question: `هل سورة ${surah.nameArabic} مكية أم مدنية؟`,
        options: [t('filter_meccan'), t('filter_medinan')],
        correctAnswer: correctType,
        explanation: `سورة ${surah.nameArabic} هي سورة ${correctType}.`
    };
}


function generateAsmaulHusnaMeaningQuestion({ asmaulHusna, t }: AppData): GeneratedQuizQuestion | null {
  if (asmaulHusna.length < 4) return null;
  const correctName = getRandomItems(asmaulHusna, 1)[0];
  const wrongOptions = getRandomItems(asmaulHusna, 3, [correctName]).map(n => n.meaning_ar);
  
  const options = shuffleArray([correctName.meaning_ar, ...wrongOptions]);
  const correctAnswer = correctName.meaning_ar;

  return {
    question: `ما هو معنى اسم الله الحسنى "${correctName.name}"؟`,
    options,
    correctAnswer,
    explanation: `معنى اسم الله "${correctName.name}" هو ${correctAnswer}.`,
  };
}

function generateProphetStorySurahQuestion({ prophetStories, surahs, t }: AppData): GeneratedQuizQuestion | null {
    if (prophetStories.length < 1 || surahs.length < 4) return null;
    const story = getRandomItems(prophetStories, 1)[0];
    const correctSurahId = parseInt(story.verses[0].split(':')[0], 10);
    const correctSurah = surahs.find(s => s.id === correctSurahId);

    if (!correctSurah) return null;
    
    const wrongSurahs = getRandomItems(surahs, 3, [correctSurah]).map(s => s.nameArabic);
    const options = shuffleArray([correctSurah.nameArabic, ...wrongSurahs]);

    return {
        question: `في أي سورة ورد ذكر قصة ${t(story.nameKey)} بشكل أساسي؟`,
        options,
        correctAnswer: correctSurah.nameArabic,
        explanation: `ورد ذكر قصة ${t(story.nameKey)} في سورة ${correctSurah.nameArabic}.`
    };
}

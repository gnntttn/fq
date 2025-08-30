import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Play, Check, X, Repeat, Award, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateQuizQuestions, GeneratedQuizQuestion } from '../lib/quizGenerator';
import { quranApi } from '../services/quranApi';
import { Surah } from '../types/quran';
import { asmaulHusnaList } from '../data/asmaulhusna';
import { prophetStories } from '../data/prophetStories';

type GameState = 'start' | 'loading' | 'playing' | 'result';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function QuizPage() {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<GeneratedQuizQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [highScore, setHighScore] = useLocalStorage('quiz-highscore-dynamic', 0);

  const startNewQuiz = async () => {
    setGameState('loading');
    const surahs = await quranApi.getSurahs();
    const generatedQuestions = generateQuizQuestions(5, {
      surahs,
      asmaulHusna: asmaulHusnaList,
      prophetStories,
      t
    });

    if (generatedQuestions.length > 0) {
      setQuestions(generatedQuestions.map(q => ({...q, options: shuffleArray(q.options)})));
      setScore(0);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setGameState('playing');
    } else {
      console.error("Failed to generate quiz, returning to start screen.");
      setGameState('start');
    }
  };

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return;

    const correct = option === questions[currentQuestionIndex].correctAnswer;
    setSelectedAnswer(option);
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        const finalScore = score + (correct ? 1 : 0);
        if (finalScore > highScore) {
          setHighScore(finalScore);
        }
        setGameState('result');
      }
    }, 2000);
  };

  const renderContent = () => {
    if (gameState === 'start' || gameState === 'loading') {
      return (
        <motion.div
          key="start"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <BrainCircuit className="text-primary dark:text-primary-light mx-auto mb-4" size={64} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('quiz_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            {t('quiz_subtitle')}
          </p>
          <button
            onClick={startNewQuiz}
            disabled={gameState === 'loading'}
            className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg dark:shadow-glow-md text-lg disabled:bg-gray-400"
          >
            {gameState === 'loading' ? <Loader className="animate-spin" /> : <Play />} {t('quiz_start')}
          </button>
        </motion.div>
      );
    }

    if (gameState === 'result') {
      return (
        <motion.div
          key="result"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-8"
        >
          <Award className="text-yellow-400 mx-auto mb-4" size={64} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('quiz_result_title')}</h2>
          <p className="text-5xl font-bold text-primary dark:text-primary-light my-4">{score} / {questions.length}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{t('quiz_highscore')}: {highScore}</p>
          <button
            onClick={startNewQuiz}
            className="flex items-center justify-center gap-3 mx-auto px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg dark:shadow-glow-md"
          >
            <Repeat /> {t('quiz_play_again')}
          </button>
        </motion.div>
      );
    }
    
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-4">
          <p className="text-gray-500 dark:text-gray-400">{t('quiz_question')} {currentQuestionIndex + 1}/{questions.length}</p>
          <div className="w-full bg-gray-200 dark:bg-space-100 rounded-full h-1.5 mt-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6 min-h-[6rem]">
            {currentQuestion.question}
          </h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, i) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentQuestion.correctAnswer;
              
              let buttonClass = "w-full text-lg text-left p-4 rounded-xl border-2 transition-all duration-200 font-semibold ";
              if (selectedAnswer !== null) {
                if (isCorrectAnswer) {
                  buttonClass += "bg-green-100 dark:bg-green-500/20 border-green-500 text-green-800 dark:text-green-300";
                } else if (isSelected) {
                  buttonClass += "bg-red-100 dark:bg-red-500/20 border-red-500 text-red-800 dark:text-red-300";
                } else {
                  buttonClass += "bg-gray-100 dark:bg-space-200/50 border-gray-200 dark:border-space-100 text-gray-700 dark:text-gray-300 opacity-60";
                }
              } else {
                buttonClass += "bg-gray-100 dark:bg-space-200/50 border-gray-200 dark:border-space-100 text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-accent-light";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg text-center ${isCorrect ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300'}`}
              >
                <p className="font-semibold">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
}

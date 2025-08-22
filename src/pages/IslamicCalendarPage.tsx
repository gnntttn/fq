import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import HijriDate from 'hijri-date';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { islamicEvents } from '../data/islamicEvents';

export function IslamicCalendarPage() {
  const { t, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());

  const hijriDate = useMemo(() => new HijriDate(currentDate.getTime()), [currentDate]);

  const daysInMonth = hijriDate.lengthOfMonth();
  const firstDayOfMonth = new HijriDate(hijriDate.getFullYear(), hijriDate.getMonth(), 1).getDay();
  const monthName = hijriDate.format('MMMM', { language });
  const year = hijriDate.getFullYear();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const dayNames = language === 'ar' 
    ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']
    : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Calendar className="text-primary dark:text-primary-light mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-arabic">
            {t('islamic_calendar_title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t('islamic_calendar_subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto bg-white/50 dark:bg-space-200/30 dark:backdrop-blur-sm border border-gray-200 dark:border-space-100/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-space-100/50"><ChevronLeft /></button>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{monthName} {year}</h2>
            <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-space-100/50"><ChevronRight /></button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {dayNames.map(day => <div key={day}>{day}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = hijriDate.getDate() === day && new Date().getMonth() === currentDate.getMonth();
              const event = islamicEvents.find(e => e.day === day && e.month === hijriDate.getMonth() + 1);
              return (
                <div key={day} className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isToday ? 'bg-primary text-white' : ''} ${event ? 'border-2 border-accent-light' : ''}`}>
                  {day}
                  {event && <div className="absolute bottom-0 w-1.5 h-1.5 bg-accent-light rounded-full"></div>}
                </div>
              );
            })}
          </div>
        </motion.div>
        
        <div className="max-w-md mx-auto mt-6 space-y-3">
          {islamicEvents.filter(e => e.month === hijriDate.getMonth() + 1).map(event => (
            <div key={event.name_key} className="bg-white/30 dark:bg-space-200/20 p-3 rounded-lg border border-gray-200 dark:border-space-100/50">
              <p className="font-bold text-gray-800 dark:text-gray-200">{event.day} {monthName} - {t(event.name_key)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t(event.description_key)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

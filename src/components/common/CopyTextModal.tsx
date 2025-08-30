import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CopyTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  textToCopy: string;
}

export function CopyTextModal({ isOpen, onClose, textToCopy }: CopyTextModalProps) {
  const { t } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-50/80 dark:bg-space-300/80 backdrop-blur-md z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white/80 dark:bg-space-200/80 backdrop-blur-lg border border-gray-200 dark:border-space-100/50 rounded-2xl shadow-lg dark:shadow-glow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-space-100/50 p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Copy size={20} />
                {t('copy_fallback_title')}
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light hover:bg-gray-200 dark:hover:bg-space-100/50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t('copy_fallback_instructions')}
              </p>
              <textarea
                ref={textareaRef}
                readOnly
                value={textToCopy}
                className="w-full h-40 p-3 bg-gray-100 dark:bg-space-300/50 border border-gray-300 dark:border-space-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-arabic text-right leading-relaxed"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

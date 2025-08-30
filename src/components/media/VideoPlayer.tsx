import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export function VideoPlayer({ url, title, onClose }: VideoPlayerProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-space-300 rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-space-100">
            <h3 className="text-lg font-bold text-gray-100 font-arabic">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="aspect-video bg-black">
            <iframe
              src={url}
              title={title}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

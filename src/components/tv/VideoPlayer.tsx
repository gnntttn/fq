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
          className="bg-space-300 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 bg-space-200">
            <h3 className="font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-space-100/50 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="aspect-video">
            <iframe
              src={url}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

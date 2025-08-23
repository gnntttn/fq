import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayer({ url, title, isOpen, onClose }: VideoPlayerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl dark:shadow-glow-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <iframe
              src={url}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media"
              allowFullScreen
              title={title}
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/30 dark:bg-space-200/20 p-4 rounded-xl animate-pulse"
  >
    <div className="flex items-center space-x-4 space-x-reverse">
      <div className="w-10 h-10 bg-gray-300 dark:bg-space-100/50 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-space-100/50 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-space-100/50 rounded w-1/2"></div>
      </div>
      <div className="w-16 h-6 bg-gray-300 dark:bg-space-100/50 rounded"></div>
    </div>
  </motion.div>
);

export const VerseSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/30 dark:bg-space-200/20 p-4 rounded-xl animate-pulse"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-8 h-8 bg-gray-300 dark:bg-space-100/50 rounded-lg"></div>
      <div className="flex-1 px-4 space-y-2">
        <div className="h-5 bg-gray-300 dark:bg-space-100/50 rounded w-full"></div>
        <div className="h-5 bg-gray-300 dark:bg-space-100/50 rounded w-3/4"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-300 dark:bg-space-100/50 rounded w-full mt-2"></div>
  </motion.div>
);

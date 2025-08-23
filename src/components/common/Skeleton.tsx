import React from 'react';

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200/80 dark:bg-space-100/80 rounded-md ${className}`}
    ></div>
  );
};

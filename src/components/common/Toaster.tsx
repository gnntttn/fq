import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
const toasts: ToastMessage[] = [];
const listeners: React.Dispatch<React.SetStateAction<ToastMessage[]>>[] = [];

const toast = {
  show: (message: string, type: ToastType = 'info') => {
    const newToast = { id: toastId++, message, type };
    toasts.push(newToast);
    listeners.forEach(listener => listener([...toasts]));
    setTimeout(() => {
      const index = toasts.findIndex(t => t.id === newToast.id);
      if (index > -1) {
        toasts.splice(index, 1);
        listeners.forEach(listener => listener([...toasts]));
      }
    }, 3000);
  },
  success: (message: string) => toast.show(message, 'success'),
  error: (message: string) => toast.show(message, 'error'),
  info: (message: string) => toast.show(message, 'info'),
};

const ToastIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="text-green-500" />;
    case 'error':
      return <XCircle className="text-red-500" />;
    case 'info':
    default:
      return <Info className="text-blue-500" />;
  }
};

export function Toaster() {
  const [localToasts, setLocalToasts] = useState(toasts);

  useEffect(() => {
    listeners.push(setLocalToasts);
    return () => {
      const index = listeners.indexOf(setLocalToasts);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-[100] space-y-2">
      <AnimatePresence>
        {localToasts.map(toast => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="flex items-center gap-3 bg-white/80 dark:bg-space-200/80 backdrop-blur-lg border border-gray-200 dark:border-space-100/50 rounded-xl shadow-lg dark:shadow-glow-md p-4"
          >
            <ToastIcon type={toast.type} />
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export { toast };

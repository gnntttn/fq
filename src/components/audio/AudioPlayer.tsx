import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Loader, Volume2, VolumeX, AlertTriangle, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  onEnded?: () => void;
  isLiveStream?: boolean;
  autoPlay?: boolean;
}

export const AudioPlayer = React.memo(({ 
  src, 
  title, 
  onNext, 
  onPrevious, 
  onEnded,
  isLiveStream = false,
  autoPlay = false
}: AudioPlayerProps) => {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePlayError = useCallback((e: any) => {
    if (e.name !== 'AbortError') {
      console.error("Audio play error:", e);
      setError(t('audio_player_error'));
    }
  }, [t]);

  const handleErrorEvent = useCallback(() => {
    setError(t('audio_player_error'));
    setIsLoading(false);
    setIsPlaying(false);
  }, [t]);
  
  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(handlePlayError);
    }
  }, [isPlaying, handlePlayError]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current && !isLiveStream) {
      setProgress(audioRef.current.currentTime);
    }
  }, [isLiveStream]);
  
  const handleDurationChange = useCallback(() => {
    if (audioRef.current && !isLiveStream) {
      const newDuration = audioRef.current.duration;
      if (isFinite(newDuration)) {
        setDuration(newDuration);
      }
    }
  }, [isLiveStream]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('error', handleErrorEvent);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('durationchange', handleDurationChange);
      if (onEnded) audio.addEventListener('ended', onEnded);
      audio.addEventListener('waiting', () => setIsLoading(true));
      audio.addEventListener('playing', () => setIsLoading(false));
      
      return () => {
        audio.removeEventListener('error', handleErrorEvent);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('durationchange', handleDurationChange);
        if (onEnded) audio.removeEventListener('ended', onEnded);
      };
    }
  }, [handleErrorEvent, handleCanPlay, onEnded, handleTimeUpdate, handleDurationChange]);
  
  useEffect(() => {
    if (src && audioRef.current) {
      setIsLoading(true);
      setError(null);
      audioRef.current.src = src;
      audioRef.current.load();
      if (autoPlay) {
        setIsPlaying(true);
      }
    }
  }, [src, autoPlay]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(handlePlayError);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, handlePlayError]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      setProgress(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds) || seconds === 0) return '0:00';
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  if (!src) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white/80 dark:bg-space-300/80 backdrop-blur-lg border-t border-gray-200 dark:border-space-100/50 shadow-lg dark:shadow-glow-lg z-40"
      >
        <audio ref={audioRef} />
        <div className="container mx-auto p-4">
          {error ? (
            <div className="flex items-center justify-center gap-2 text-red-500">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <button onClick={onPrevious} disabled={!onPrevious || isLiveStream} className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light disabled:text-gray-300 dark:disabled:text-space-100 transition-colors rounded-full disabled:opacity-50">
                  <SkipBack size={20} />
                </button>
                <button onClick={handlePlayPause} className="p-3 bg-accent-light text-space-300 rounded-full hover:bg-white transition-colors shadow-md dark:shadow-glow-md" disabled={isLoading && !isLiveStream}>
                  {isLoading ? <Loader size={24} className="animate-spin" /> : (isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current" />)}
                </button>
                <button onClick={onNext} disabled={!onNext || isLiveStream} className="p-2 text-gray-500 dark:text-gray-400 hover:text-accent-light disabled:text-gray-300 dark:disabled:text-space-100 transition-colors rounded-full disabled:opacity-50">
                  <SkipForward size={20} />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                {title && (<p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate mb-1 text-center">{title}</p>)}
                {isLiveStream ? (
                  <div className="flex items-center justify-center gap-2 text-red-500 font-bold">
                    <Radio size={16} className="animate-pulse" />
                    <span>LIVE</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono w-10 text-center">{formatTime(progress)}</span>
                    <input type="range" min={0} max={duration} value={progress} onChange={handleSeek} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer slider" style={{'--progress': `${(progress / duration) * 100}%`} as React.CSSProperties} disabled={isLoading || duration === 0} />
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono w-10 text-center">{formatTime(duration)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                 <button onClick={toggleMute}>
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-20 h-1.5 rounded-lg appearance-none cursor-pointer slider" style={{'--progress': `${(isMuted ? 0 : volume) * 100}%`} as React.CSSProperties} />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

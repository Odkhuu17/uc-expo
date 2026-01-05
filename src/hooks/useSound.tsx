import { useEffect, useRef, useState } from 'react';
import Sound from 'react-native-sound';

const useSound = (filename: string) => {
  const sound = useRef<Sound | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationSec, setDurationSec] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);

  useEffect(() => {
    sound.current = new Sound(filename, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }
      const duration = sound.current?.getDuration();

      if (typeof duration === 'number' && !Number.isNaN(duration)) {
        setDurationSec(duration);
      }

      setIsLoaded(true);
    });

    return () => {
      sound.current?.release();
    };
  }, [filename]);

  // Poll current time every 0.5s while playing.
  useEffect(() => {
    if (!isPlaying) return;
    let cancelled = false;
    const id = setInterval(() => {
      sound.current?.getCurrentTime(seconds => {
        if (cancelled) return;
        if (typeof seconds === 'number' && !Number.isNaN(seconds)) {
          setCurrentTimeSec(seconds);
        }
      });
    }, 500);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [isPlaying]);

  const play = () => {
    if (sound.current && isLoaded) {
      sound.current.play(success => {
        setIsPlaying(false);
        // Ensure UI snaps to the end (or current duration) when playback completes.
        if (success) setCurrentTimeSec(durationSec);
      });
      setIsPlaying(true);
    }
  };

  const stop = () => {
    if (sound.current) {
      sound.current.stop();
      setIsPlaying(false);
      setCurrentTimeSec(0);
    }
  };

  return {
    play,
    stop,
    isLoaded,
    isPlaying,
    durationSec,
    currentTimeSec,
    sound,
  };
};

export default useSound;

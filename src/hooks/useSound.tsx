import { useEffect, useState } from 'react';
import Sound from 'react-native-nitro-sound';

const useSound = (filename: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationSec, setDurationSec] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);

  useEffect(() => {
    // Preload to get duration
    const preload = async () => {
      try {
        let duration = 0;

        // Add listener to capture duration
        Sound.addPlayBackListener(e => {
          duration = e.duration / 1000;
          setDurationSec(e.duration / 1000);
          setCurrentTimeSec(e.currentPosition / 1000);
        });

        // Set volume to 0 before starting to prevent audio from playing

        // Start and immediately pause to load metadata
        await Sound.startPlayer(filename);
        await Sound.setVolume(0);

        // Wait a bit for the listener to fire and get duration
        await new Promise(resolve => setTimeout(resolve, 100));

        await Sound.pausePlayer();

        // Restore volume to full
        await Sound.setVolume(1);

        setIsLoaded(true);
      } catch (error) {
        console.log('Error preloading:', error);
        setIsLoaded(true);
      }
    };

    preload();

    return () => {
      try {
        Sound.stopPlayer();
        Sound.removePlayBackListener();
        Sound.removePlaybackEndListener();
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, [filename]);

  const play = async () => {
    if (!isLoaded) return;

    try {
      Sound.addPlaybackEndListener(() => {
        setIsPlaying(false);
      });

      // Try to resume first, if it fails, restart from beginning
      try {
        await Sound.resumePlayer();
      } catch (resumeError) {
        // Player was stopped, need to restart
        await Sound.startPlayer(filename);
      }

      setIsPlaying(true);
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const stop = async () => {
    try {
      await Sound.pausePlayer();
      await Sound.seekToPlayer(0);
      setIsPlaying(false);
      setCurrentTimeSec(0);
    } catch (error) {
      console.log('Error stopping audio:', error);
    }
  };

  return {
    play,
    stop,
    isLoaded,
    isPlaying,
    durationSec,
    currentTimeSec,
  };
};

export default useSound;

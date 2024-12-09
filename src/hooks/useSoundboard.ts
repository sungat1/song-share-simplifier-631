import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { generateSound, predefinedSounds, SoundType } from '../utils/audioGenerator';

export interface Sound {
  id: string;
  name: string;
  type: SoundType;
  isPlaying: boolean;
  loopInterval?: number;
}

export interface Song {
  id: string;
  name: string;
  sounds: Sound[];
}

export const useSoundboard = () => {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSounds, setRecordedSounds] = useState<Sound[]>([]);
  const [songName, setSongName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const clearBoard = useCallback(() => {
    console.log('Clearing board...');
    // Stop all playing sounds
    sounds.forEach(sound => {
      if (sound.loopInterval) {
        clearInterval(sound.loopInterval);
      }
    });
    setSounds([]);
    setRecordedSounds([]);
    setSongName('');
    setIsRecording(false);
    navigate('/');
    toast.success('Board cleared');
  }, [navigate, sounds]);

  const addSound = useCallback((soundType: SoundType) => {
    const newSound: Sound = {
      id: crypto.randomUUID(),
      name: soundType,
      type: soundType,
      isPlaying: false
    };
    setSounds(prev => [...prev, newSound]);
  }, []);

  const removeSound = useCallback((soundId: string) => {
    setSounds(prev => {
      const soundToRemove = prev.find(s => s.id === soundId);
      if (soundToRemove?.loopInterval) {
        clearInterval(soundToRemove.loopInterval);
      }
      return prev.filter(s => s.id !== soundId);
    });
  }, []);

  const toggleSound = useCallback((soundId: string) => {
    setSounds(prev => {
      return prev.map(sound => {
        if (sound.id === soundId) {
          if (sound.isPlaying && sound.loopInterval) {
            clearInterval(sound.loopInterval);
            return { ...sound, isPlaying: false, loopInterval: undefined };
          } else {
            const interval = window.setInterval(() => {
              generateSound(predefinedSounds[sound.type]);
            }, 500) as unknown as number;
            return { ...sound, isPlaying: true, loopInterval: interval };
          }
        }
        return sound;
      });
    });
  }, []);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setRecordedSounds([]);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const recordSound = useCallback((sound: Sound) => {
    if (isRecording) {
      setRecordedSounds(prev => [...prev, sound]);
    }
  }, [isRecording]);

  const saveSong = useCallback(async () => {
    if (!songName) {
      toast.error('Please enter a song name');
      return;
    }

    const song: Song = {
      id: crypto.randomUUID(),
      name: songName,
      sounds: recordedSounds,
    };

    try {
      console.log('Saving song:', song);
      navigate(`/?song=${song.id}`);
      toast.success('Song saved successfully!');
      return song;
    } catch (error) {
      console.error('Error saving song:', error);
      toast.error('Failed to save song');
      return null;
    }
  }, [songName, recordedSounds, navigate]);

  const loadSong = useCallback(async (songId: string) => {
    try {
      console.log('Loading song:', songId);
      const mockSong: Song = {
        id: songId,
        name: 'Loaded Song',
        sounds: [],
      };
      
      setSongName(mockSong.name);
      setRecordedSounds(mockSong.sounds);
      toast.success('Song loaded successfully!');
    } catch (error) {
      console.error('Error loading song:', error);
      toast.error('Failed to load song');
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const songId = params.get('song');
    if (songId) {
      loadSong(songId);
    }
  }, [location.search, loadSong]);

  return {
    sounds,
    addSound,
    removeSound,
    toggleSound,
    isRecording,
    startRecording,
    stopRecording,
    recordSound,
    recordedSounds,
    songName,
    setSongName,
    saveSong,
    loadSong,
    clearBoard,
  };
};
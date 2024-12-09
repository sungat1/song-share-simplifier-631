import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export interface Sound {
  id: string;
  name: string;
  url: string;
  isPlaying: boolean;
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
    setSounds([]);
    setRecordedSounds([]);
    setSongName('');
    setIsRecording(false);
    navigate('/'); // Clear URL parameters
    toast.success('Board cleared');
  }, [navigate]);

  const addSound = useCallback((sound: Sound) => {
    setSounds(prev => [...prev, sound]);
  }, []);

  const removeSound = useCallback((soundId: string) => {
    setSounds(prev => prev.filter(s => s.id !== soundId));
  }, []);

  const toggleSound = useCallback((soundId: string) => {
    setSounds(prev => 
      prev.map(sound => 
        sound.id === soundId 
          ? { ...sound, isPlaying: !sound.isPlaying }
          : sound
      )
    );
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
      // Simulate saving to a backend
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
      // Simulate loading from a backend
      console.log('Loading song:', songId);
      // In a real app, you would fetch the song data from your backend
      const mockSong: Song = {
        id: songId,
        name: 'Loaded Song',
        sounds: [], // This would come from your backend
      };
      
      setSongName(mockSong.name);
      setRecordedSounds(mockSong.sounds);
      toast.success('Song loaded successfully!');
    } catch (error) {
      console.error('Error loading song:', error);
      toast.error('Failed to load song');
    }
  }, []);

  // Load song from URL on initial render
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
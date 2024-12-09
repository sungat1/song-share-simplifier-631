import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useSoundboard } from '../hooks/useSoundboard';
import { Trash2 } from 'lucide-react';

const Soundboard: React.FC = () => {
  const {
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
    clearBoard,
  } = useSoundboard();

  const handleAddSound = () => {
    const newSound = {
      id: crypto.randomUUID(),
      name: `Sound ${sounds.length + 1}`,
      url: '/path/to/sound.mp3',
      isPlaying: false,
    };
    addSound(newSound);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "default"}
            className="min-w-[100px]"
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          <Button onClick={handleAddSound}>Add Sound</Button>
          <Button 
            variant="outline" 
            onClick={clearBoard}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Input
            placeholder="Song name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            className="min-w-[200px]"
          />
          <Button onClick={saveSong}>Save</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
        {sounds.map((sound) => (
          <div
            key={sound.id}
            className="p-4 bg-white rounded-lg shadow-sm border flex items-center justify-between"
          >
            <span>{sound.name}</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={sound.isPlaying ? "destructive" : "default"}
                onClick={() => {
                  toggleSound(sound.id);
                  if (!sound.isPlaying) {
                    recordSound(sound);
                  }
                }}
              >
                {sound.isPlaying ? 'Stop' : 'Play'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeSound(sound.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {recordedSounds.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recorded Sequence</h2>
          <div className="flex flex-wrap gap-2">
            {recordedSounds.map((sound, index) => (
              <div
                key={`${sound.id}-${index}`}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {sound.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Soundboard;
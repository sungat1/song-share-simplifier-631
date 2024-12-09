import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useSoundboard } from '../hooks/useSoundboard';
import { Trash2 } from 'lucide-react';
import { predefinedSounds } from '../utils/audioGenerator';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

const Soundboard: React.FC = () => {
  const {
    sounds,
    addSound,
    removeSound,
    toggleSound,
    updatePattern,
    isRecording,
    startRecording,
    stopRecording,
    recordSound,
    recordedSounds,
    songName,
    setSongName,
    saveSong,
    clearBoard,
    globalBPM,
    setGlobalBPM,
  } = useSoundboard();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "default"}
            className="w-full sm:w-auto"
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          <div className="flex flex-wrap gap-2">
            {Object.keys(predefinedSounds).map((soundType) => (
              <Button 
                key={soundType}
                onClick={() => addSound(soundType as keyof typeof predefinedSounds)}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                Add {soundType}
              </Button>
            ))}
          </div>
          <Button 
            variant="outline" 
            onClick={clearBoard}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <Input
            type="number"
            placeholder="BPM"
            value={globalBPM}
            onChange={(e) => setGlobalBPM(Number(e.target.value))}
            className="w-24"
            min={40}
            max={200}
          />
          <Input
            placeholder="Song name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={saveSong} className="w-full sm:w-auto">Save</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sounds.map((sound) => (
          <div
            key={sound.id}
            className="p-4 bg-white rounded-lg shadow-sm border flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="capitalize">{sound.name}</span>
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
            
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">Pattern:</span>
              <ToggleGroup 
                type="multiple"
                value={sound.pattern?.map((v, i) => v ? i.toString() : '').filter(Boolean)}
                onValueChange={(values) => {
                  const newPattern = Array(16).fill(0);
                  values.forEach(v => {
                    newPattern[parseInt(v)] = 1;
                  });
                  updatePattern(sound.id, newPattern);
                }}
                className="flex flex-wrap gap-1"
              >
                {Array(16).fill(0).map((_, i) => (
                  <ToggleGroupItem
                    key={i}
                    value={i.toString()}
                    aria-label={`Step ${i + 1}`}
                    className="w-8 h-8 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {i + 1}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
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
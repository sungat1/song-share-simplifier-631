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
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-center mb-8">Programmable Soundboard</h1>
          
          {/* Controls Section */}
          <div className="flex flex-wrap gap-4 justify-center items-center bg-gray-800 p-4 rounded-lg">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? "destructive" : "default"}
              className="min-w-[120px] bg-purple-600 hover:bg-purple-700"
            >
              {isRecording ? 'Stop' : 'Play'}
            </Button>
            
            <div className="flex flex-wrap gap-2">
              {Object.keys(predefinedSounds).map((soundType) => (
                <Button 
                  key={soundType}
                  onClick={() => addSound(soundType as keyof typeof predefinedSounds)}
                  variant="outline"
                  className="bg-gray-700 hover:bg-gray-600 border-gray-600"
                >
                  Add {soundType}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="BPM"
                value={globalBPM}
                onChange={(e) => setGlobalBPM(Number(e.target.value))}
                className="w-24 bg-gray-700 border-gray-600 text-white"
                min={40}
                max={200}
              />
              <span className="text-gray-400">BPM</span>
            </div>

            <Button 
              variant="outline" 
              onClick={clearBoard}
              className="bg-gray-700 hover:bg-gray-600 border-gray-600 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>
          </div>

          {/* Song Management */}
          <div className="flex flex-wrap gap-4 items-center justify-center bg-gray-800 p-4 rounded-lg">
            <Input
              placeholder="Song name"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              className="max-w-xs bg-gray-700 border-gray-600 text-white"
            />
            <Button 
              onClick={saveSong}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Save
            </Button>
          </div>
        </div>

        {/* Sound Patterns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sounds.map((sound) => (
            <div
              key={sound.id}
              className="bg-gray-800 rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="capitalize text-lg font-medium">{sound.name}</span>
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
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {sound.isPlaying ? 'Stop' : 'Play'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeSound(sound.id)}
                    className="hover:bg-gray-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm text-gray-400">Pattern:</span>
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
                  className="grid grid-cols-8 sm:grid-cols-16 gap-1"
                >
                  {Array(16).fill(0).map((_, i) => (
                    <ToggleGroupItem
                      key={i}
                      value={i.toString()}
                      aria-label={`Step ${i + 1}`}
                      className="w-8 h-8 bg-gray-700 data-[state=on]:bg-purple-600 data-[state=on]:text-white border-gray-600"
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
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recorded Sequence</h2>
            <div className="flex flex-wrap gap-2">
              {recordedSounds.map((sound, index) => (
                <div
                  key={`${sound.id}-${index}`}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                >
                  {sound.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Soundboard;
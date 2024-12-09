// Sound generation utilities using Web Audio API
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

interface OscillatorOptions {
  type: OscillatorType;
  frequency: number;
  duration: number;
  gain?: number;
}

export const generateSound = ({
  type = 'sine',
  frequency,
  duration,
  gain = 0.5
}: OscillatorOptions): Promise<void> => {
  return new Promise((resolve) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
    
    oscillator.onended = () => {
      resolve();
    };
  });
};

export const predefinedSounds = {
  kick: {
    type: 'sine' as OscillatorType,
    frequency: 150,
    duration: 0.1,
    gain: 0.8
  },
  hihat: {
    type: 'square' as OscillatorType,
    frequency: 2000,
    duration: 0.05,
    gain: 0.3
  },
  snare: {
    type: 'triangle' as OscillatorType,
    frequency: 400,
    duration: 0.1,
    gain: 0.5
  },
  bass: {
    type: 'sine' as OscillatorType,
    frequency: 80,
    duration: 0.3,
    gain: 0.6
  }
};

export type SoundType = keyof typeof predefinedSounds;
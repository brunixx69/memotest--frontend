import { useRef, useState, useCallback, useEffect } from 'react';

type SoundType = 'flip' | 'match' | 'error' | 'win' | 'click';

export const useSound = () => {
    const [muted, setMuted] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on user interaction if needed, 
        // but cleaner to do it on first play to avoid warnings about autoplay
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const getContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return audioContextRef.current;
    };

    const playTone = (freq: number, type: OscillatorType, duration: number, startTime: number = 0, vol: number = 0.1) => {
        const ctx = getContext();
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

        gain.gain.setValueAtTime(vol, ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
    };

    const playSound = useCallback((type: SoundType) => {
        if (muted) return;

        switch (type) {
            case 'flip':
                // Short, crisp high tone
                playTone(600, 'sine', 0.1, 0, 0.05);
                break;
            case 'match':
                // Major Chord Arpeggio (C Major)
                playTone(523.25, 'sine', 0.1, 0, 0.1); // C5
                playTone(659.25, 'sine', 0.1, 0.1, 0.1); // E5
                playTone(783.99, 'sine', 0.3, 0.2, 0.1); // G5
                break;
            case 'error':
                // Dissonant low tones
                playTone(150, 'sawtooth', 0.2, 0, 0.05);
                playTone(140, 'sawtooth', 0.2, 0.1, 0.05);
                break;
            case 'win':
                // Fanfare
                const now = 0;
                playTone(523.25, 'square', 0.2, now, 0.1); // C5
                playTone(523.25, 'square', 0.2, now + 0.2, 0.1);
                playTone(523.25, 'square', 0.2, now + 0.4, 0.1);
                playTone(783.99, 'square', 0.6, now + 0.6, 0.1); // G5
                break;
            case 'click':
                playTone(800, 'sine', 0.05, 0, 0.03);
                break;
        }
    }, [muted]);

    const toggleMute = () => setMuted(prev => !prev);

    return { playSound, muted, toggleMute };
};

import { useState, useEffect } from 'react';
import { Difficulty } from './useMemoryGame';

export interface ScoreEntry {
    name: string;
    moves: number;
    time: number;
    date: string;
}

const STORAGE_KEY = 'memotest_leaderboard';

export const useLeaderboard = () => {
    const [scores, setScores] = useState<Record<Difficulty, ScoreEntry[]>>({
        easy: [],
        medium: [],
        hard: [],
    });

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setScores(JSON.parse(stored));
        }
    }, []);

    const saveScore = (difficulty: Difficulty, entry: ScoreEntry) => {
        const currentScores = scores[difficulty];
        const newScores = [...currentScores, entry].sort((a, b) => {
            // Sort by moves (asc), then time (asc)
            if (a.moves !== b.moves) return a.moves - b.moves;
            return a.time - b.time;
        });

        const top5 = newScores.slice(0, 5);

        const updatedScores = {
            ...scores,
            [difficulty]: top5,
        };

        setScores(updatedScores);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
    };

    const isHighScore = (difficulty: Difficulty, moves: number, time: number): boolean => {
        const currentScores = scores[difficulty];
        if (currentScores.length < 5) return true;

        const worstBest = currentScores[currentScores.length - 1];
        if (moves < worstBest.moves) return true;
        if (moves === worstBest.moves && time < worstBest.time) return true;

        return false;
    };

    return {
        scores,
        saveScore,
        isHighScore,
    };
};

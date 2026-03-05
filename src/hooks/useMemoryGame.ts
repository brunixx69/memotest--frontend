import { useState, useEffect, useRef, useCallback } from 'react';
import {
    Star, Heart, Zap, Moon, Sun, Cloud, Snowflake, Flame,
    Ghost, Anchor, Camera, Music, Gift, Coffee
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CardType {
    id: number;
    icon: LucideIcon;
    isFlipped: boolean;
    isMatched: boolean;
}

export type GameAction = 'flip' | 'match' | 'error' | 'win' | null;

const ICONS = [
    Star, Heart, Zap, Moon, Sun, Cloud, Snowflake, Flame,
    Ghost, Anchor, Camera, Music, Gift, Coffee
];

const DIFFICULTY_SETTINGS = {
    easy: { pairs: 4, cols: 4, rows: 2 },
    medium: { pairs: 8, cols: 4, rows: 4 },
    hard: { pairs: 12, cols: 6, rows: 4 },
};

export const useMemoryGame = (difficulty: Difficulty) => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const [shakeCards, setShakeCards] = useState<number[]>([]);
    const [turns, setTurns] = useState(0);
    const [isWon, setIsWon] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Return values to trigger sounds in GameBoard
    const [lastAction, setLastAction] = useState<GameAction>(null);

    const timerRef = useRef<number | null>(null);

    const shuffleCards = useCallback(() => {
        const numPairs = DIFFICULTY_SETTINGS[difficulty].pairs;
        const selectedIcons = ICONS.slice(0, numPairs);
        const duplicatedIcons = [...selectedIcons, ...selectedIcons];

        return duplicatedIcons
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({
                id: index,
                icon,
                isFlipped: false,
                isMatched: false,
            }));
    }, [difficulty]);

    const startNewGame = useCallback(() => {
        setCards(shuffleCards());
        setFlippedCards([]);
        setMatchedCards([]);
        setShakeCards([]);
        setTurns(0);
        setIsWon(false);
        setIsDisabled(false);
        setTimer(0);
        setIsPlaying(false);
        setLastAction(null);
        if (timerRef.current) clearInterval(timerRef.current);
    }, [shuffleCards]);

    useEffect(() => {
        startNewGame();
    }, [difficulty, startNewGame]);

    useEffect(() => {
        if (isPlaying && !isWon) {
            timerRef.current = window.setInterval(() => {
                setTimer((t) => t + 1);
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, isWon]);

    const handleChoice = (id: number) => {
        // Prevent clicking if disabled or already flipped/matched
        if (isDisabled) return;

        const card = cards.find(c => c.id === id);
        if (!card || card.isFlipped || card.isMatched) return;

        // Start timer on first flip
        if (!isPlaying) setIsPlaying(true);

        setLastAction('flip');

        // Update cards state to flip the card
        const newCards = cards.map(c =>
            c.id === id ? { ...c, isFlipped: true } : c
        );
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setTurns(t => t + 1);
            setIsDisabled(true); // Block interaction while comparing
            checkForMatch(newFlipped, newCards);
        }
    };

    const checkForMatch = (currentFlipped: number[], currentCards: CardType[]) => {
        const [id1, id2] = currentFlipped;
        const card1 = currentCards.find(c => c.id === id1);
        const card2 = currentCards.find(c => c.id === id2);

        if (card1 && card2 && card1.icon === card2.icon) {
            // Match found
            setLastAction('match');
            const newMatched = [...matchedCards, id1, id2];

            setCards(prev => prev.map(c =>
                (c.id === id1 || c.id === id2) ? { ...c, isMatched: true, isFlipped: true } : c
            ));

            setMatchedCards(newMatched);
            setFlippedCards([]);
            setIsDisabled(false);

            if (newMatched.length === cards.length) {
                setIsWon(true);
                setIsPlaying(false);
                setLastAction('win');
            }
        } else {
            // Mismatch
            setTimeout(() => {
                setLastAction('error');
                setShakeCards([id1, id2]);

                setTimeout(() => {
                    setShakeCards([]);
                    setCards(prev => prev.map(c =>
                        (c.id === id1 || c.id === id2) ? { ...c, isFlipped: false } : c
                    ));
                    setFlippedCards([]);
                    setIsDisabled(false);
                }, 400); // Duration matches CSS shake animation
            }, 600); // Time for flip animation to be visible
        }
    };

    const clearLastAction = () => setLastAction(null);

    return {
        cards,
        moves: turns,
        timer,
        isWon,
        isDisabled,
        startNewGame,
        handleChoice,
        cols: DIFFICULTY_SETTINGS[difficulty].cols,
        shakeCards,
        lastAction,
        clearLastAction
    };
};

import { useState, useEffect, useRef } from 'react';
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
    const [moves, setMoves] = useState(0);
    const [isWon, setIsWon] = useState(false);
    const [canFlip, setCanFlip] = useState(true);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Return values to trigger sounds in GameBoard
    const [lastAction, setLastAction] = useState<'flip' | 'match' | 'error' | 'win' | null>(null);

    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        startNewGame();
    }, [difficulty]);

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

    const shuffleCards = () => {
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
    };

    const startNewGame = () => {
        setCards(shuffleCards());
        setFlippedCards([]);
        setMatchedCards([]);
        setShakeCards([]);
        setMoves(0);
        setIsWon(false);
        setCanFlip(true);
        setTimer(0);
        setIsPlaying(true);
        setLastAction(null);
    };

    const handleCardClick = (id: number) => {
        if (!canFlip) return;
        const clickedCard = cards.find(c => c.id === id);
        if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

        if (!isPlaying) setIsPlaying(true);

        const newCards = cards.map(c =>
            c.id === id ? { ...c, isFlipped: true } : c
        );
        setCards(newCards);
        setLastAction('flip');

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            setCanFlip(false);
            checkForMatch(newFlipped, newCards);
        }
    };

    const checkForMatch = (currentFlipped: number[], currentCards: CardType[]) => {
        const [id1, id2] = currentFlipped;
        const card1 = currentCards.find(c => c.id === id1);
        const card2 = currentCards.find(c => c.id === id2);

        if (card1 && card2 && card1.icon === card2.icon) {
            // Match found
            const newMatched = [...matchedCards, id1, id2];
            setMatchedCards(newMatched);
            setLastAction('match');

            setCards(prev => prev.map(c =>
                (c.id === id1 || c.id === id2) ? { ...c, isMatched: true, isFlipped: true } : c
            ));
            setFlippedCards([]);
            setCanFlip(true);

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
                    setCanFlip(true);
                }, 500); // Wait for shake animation
            }, 600); // Wait for flip animation
        }
    };

    // Reset helper for triggers
    const clearLastAction = () => setLastAction(null);

    return {
        cards,
        moves,
        timer,
        isWon,
        startNewGame,
        handleCardClick,
        cols: DIFFICULTY_SETTINGS[difficulty].cols,
        shakeCards,
        lastAction,
        clearLastAction
    };
};

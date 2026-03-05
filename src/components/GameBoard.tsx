import { useState, useEffect } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material';
import Card from './Card';
import VictoryModal from './VictoryModal';
import Leaderboard from './Leaderboard';
import { useMemoryGame, Difficulty } from '../hooks/useMemoryGame';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useSound } from '../hooks/useSound';
import { Timer, Trophy, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

const GameBoard = () => {
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const {
        cards, moves, timer, isWon, isDisabled, startNewGame, handleChoice, cols,
        shakeCards, lastAction, clearLastAction
    } = useMemoryGame(difficulty);
    const { scores, saveScore, isHighScore } = useLeaderboard();
    const { playSound, muted, toggleMute } = useSound();
    const [modalOpen, setModalOpen] = useState(false);

    // Sound and Effect Logic
    useEffect(() => {
        if (!lastAction) return;

        if (lastAction === 'win') {
            playSound('win');
            triggerConfetti();
        } else {
            playSound(lastAction);
        }

        clearLastAction();
    }, [lastAction, playSound, clearLastAction]);

    useEffect(() => {
        if (isWon) {
            setTimeout(() => setModalOpen(true), 1000); // Delay modal for confetti/fanfare
        }
    }, [isWon]);

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#60A5FA', '#A78BFA', '#FBBF24']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#60A5FA', '#A78BFA', '#FBBF24']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const handleDifficultyChange = (
        _event: React.MouseEvent<HTMLElement>,
        newDifficulty: Difficulty | null,
    ) => {
        if (newDifficulty !== null) {
            playSound('click');
            setDifficulty(newDifficulty);
        }
    };

    const handleSaveScore = (name: string) => {
        saveScore(difficulty, {
            name,
            moves,
            time: timer,
            date: new Date().toISOString(),
        });
        setModalOpen(false);
    };

    const handleRestart = () => {
        playSound('click');
        setModalOpen(false);
        startNewGame();
    };

    const qualifiesForHighScore = isHighScore(difficulty, moves, timer);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                padding: 4,
                background: '#0F172A', // Slate 900
                minHeight: '100vh',
                width: '100vw',
                color: 'white',
                pb: 10,
                boxSizing: 'border-box'
            }}
        >
            <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
                <IconButton onClick={toggleMute} sx={{ color: '#94A3B8', '&:hover': { color: '#F8FAFC' } }}>
                    {muted ? <VolumeX /> : <Volume2 />}
                </IconButton>
            </Box>

            <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 800 }}>
                <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, background: 'linear-gradient(to right, #60A5FA, #A78BFA)', backgroundClip: 'text', color: 'transparent' }}>
                    Memotest
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <ToggleButtonGroup
                        value={difficulty}
                        exclusive
                        onChange={handleDifficultyChange}
                        aria-label="difficulty"
                        sx={{
                            backgroundColor: '#1E293B',
                            '& .MuiToggleButton-root': {
                                color: '#94A3B8',
                                borderColor: '#334155',
                                px: 3,
                                '&.Mui-selected': {
                                    color: '#F8FAFC',
                                    backgroundColor: '#3B82F6',
                                    '&:hover': {
                                        backgroundColor: '#2563EB',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                }
                            }
                        }}
                    >
                        <ToggleButton value="easy">Easy (4x2)</ToggleButton>
                        <ToggleButton value="medium">Medium (4x4)</ToggleButton>
                        <ToggleButton value="hard">Hard (6x4)</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight="bold" color="#F8FAFC">
                            {moves}
                        </Typography>
                        <Typography variant="caption" color="#64748B" letterSpacing={1}>MOVES</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FBBF24' }}>
                        <Trophy size={24} />
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <Timer size={20} color="#64748B" />
                            <Typography variant="h4" fontWeight="bold" color="#F8FAFC">
                                {timer}s
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="#64748B" letterSpacing={1}>TIME</Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: 1.5,
                    maxWidth: '800px',
                    width: '100%',
                }}
            >
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        icon={card.icon}
                        isFlipped={card.isFlipped}
                        isMatched={card.isMatched}
                        isShake={shakeCards.includes(card.id)}
                        disabled={isDisabled}
                        onClick={() => handleChoice(card.id)}
                    />
                ))}
            </Box>

            {!isWon && (
                <Button
                    variant="outlined"
                    onClick={handleRestart}
                    sx={{
                        mt: 2,
                        color: '#94A3B8',
                        borderColor: '#334155',
                        '&:hover': {
                            borderColor: '#64748B',
                            color: '#F8FAFC',
                            background: 'rgba(255,255,255,0.05)'
                        }
                    }}
                >
                    Reset Game
                </Button>
            )}

            <Leaderboard scores={scores} />

            <VictoryModal
                open={modalOpen}
                moves={moves}
                time={timer}
                isHighScore={qualifiesForHighScore}
                onRestart={handleRestart}
                onSaveScore={handleSaveScore}
            />
        </Box>
    );
};

export default GameBoard;

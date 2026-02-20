import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    TextField,
    Box,
} from '@mui/material';
import { Trophy } from 'lucide-react';

interface VictoryModalProps {
    open: boolean;
    moves: number;
    time: number;
    isHighScore: boolean;
    onRestart: () => void;
    onSaveScore: (name: string) => void;
}

const VictoryModal = ({
    open,
    moves,
    time,
    isHighScore,
    onRestart,
    onSaveScore,
}: VictoryModalProps) => {
    const [name, setName] = useState('');

    const handleSave = () => {
        if (name.trim()) {
            onSaveScore(name);
            onRestart();
        }
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth PaperProps={{
            style: {
                backgroundColor: '#1E293B',
                color: 'white',
                border: '1px solid #334155'
            }
        }}>
            <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Trophy size={48} color="#FBBF24" />
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#FBBF24' }}>
                    Victory!
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, color: '#94A3B8' }}>
                    You completed the game in:
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
                    <Box>
                        <Typography variant="h3" fontWeight="bold" color="white">
                            {moves}
                        </Typography>
                        <Typography variant="body2" color="#64748B">MOVES</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h3" fontWeight="bold" color="white">
                            {time}s
                        </Typography>
                        <Typography variant="body2" color="#64748B">TIME</Typography>
                    </Box>
                </Box>

                {isHighScore ? (
                    <Box sx={{ mt: 2, p: 3, border: '1px solid #334155', borderRadius: 2, bgcolor: '#0F172A' }}>
                        <Typography variant="h6" sx={{ color: '#A78BFA', mb: 2 }}>
                            🎉 New High Score! 🎉
                        </Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            variant="outlined"
                            label="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                input: { color: 'white' },
                                label: { color: '#94A3B8' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#475569' },
                                    '&:hover fieldset': { borderColor: '#64748B' },
                                    '&.Mui-focused fieldset': { borderColor: '#A78BFA' },
                                }
                            }}
                        />
                    </Box>
                ) : (
                    <Typography variant="body1" color="#94A3B8">
                        Great job! Try to beat your record next time.
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
                {isHighScore ? (
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={!name.trim()}
                        fullWidth
                        size="large"
                        sx={{
                            bgcolor: '#A78BFA',
                            '&:hover': { bgcolor: '#8B5CF6' }
                        }}
                    >
                        Save & Play Again
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={onRestart}
                        fullWidth
                        size="large"
                        sx={{
                            bgcolor: '#3B82F6',
                            '&:hover': { bgcolor: '#2563EB' }
                        }}
                    >
                        Play Again
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default VictoryModal;

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
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: '#1E293B',
                    color: 'white',
                    border: '1px solid #334155',
                    borderRadius: '24px',
                    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }
            }}
            TransitionProps={{ timeout: 500 }}
        >
            <DialogTitle sx={{ textAlign: 'center', pt: 6 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 3,
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    <Trophy size={80} color="#FBBF24" style={{ filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.4))' }} />
                </Box>
                <Typography variant="h3" fontWeight="bold" sx={{
                    background: 'linear-gradient(to bottom, #FBBF24, #F59E0B)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    letterSpacing: -1
                }}>
                    Victory!
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ textAlign: 'center', py: 4, px: 4 }}>
                <Typography variant="h6" sx={{ mb: 4, color: '#94A3B8', fontWeight: 400 }}>
                    Excellent performance! You've mastered the board.
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: { xs: 2, sm: 6 },
                    mb: 5,
                    p: 3,
                    borderRadius: '20px',
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <Box>
                        <Typography variant="h2" fontWeight="800" color="white" sx={{ lineHeight: 1 }}>
                            {moves}
                        </Typography>
                        <Typography variant="caption" color="#64748B" sx={{ letterSpacing: 2, fontWeight: 700 }}>TURNS</Typography>
                    </Box>
                    <Box sx={{ width: '1px', bgcolor: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
                    <Box>
                        <Typography variant="h2" fontWeight="800" color="white" sx={{ lineHeight: 1 }}>
                            {time}s
                        </Typography>
                        <Typography variant="caption" color="#64748B" sx={{ letterSpacing: 2, fontWeight: 700 }}>TIME</Typography>
                    </Box>
                </Box>

                {isHighScore ? (
                    <Box sx={{
                        mt: 2,
                        p: 4,
                        border: '2px solid #A78BFA',
                        borderRadius: '20px',
                        bgcolor: 'rgba(167, 139, 250, 0.1)',
                        boxShadow: '0 0 30px rgba(167, 139, 250, 0.1)'
                    }}>
                        <Typography variant="h5" sx={{ color: '#A78BFA', mb: 3, fontWeight: 700 }}>
                            Legends Are Real! 🏆
                        </Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            variant="filled"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    '&:before, &:after': { display: 'none' },
                                    border: '1px solid #475569',
                                    '&.Mui-focused': { borderColor: '#A78BFA' }
                                }
                            }}
                        />
                    </Box>
                ) : (
                    <Typography variant="body1" color="#94A3B8" sx={{ fontStyle: 'italic' }}>
                        "Success is not final, failure is not fatal: it is the courage to continue that counts."
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 4, pt: 0, justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    onClick={isHighScore ? handleSave : onRestart}
                    disabled={isHighScore && !name.trim()}
                    fullWidth
                    size="large"
                    sx={{
                        py: 2,
                        borderRadius: '14px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        bgcolor: isHighScore ? '#A78BFA' : '#3B82F6',
                        boxShadow: `0 10px 20px ${isHighScore ? 'rgba(167, 139, 250, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
                        '&:hover': {
                            bgcolor: isHighScore ? '#8B5CF6' : '#2563EB',
                            transform: 'translateY(-2px)',
                            boxShadow: `0 15px 25px ${isHighScore ? 'rgba(167, 139, 250, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`,
                        },
                        '&:active': { transform: 'translateY(0)' },
                        transition: 'all 0.2s ease'
                    }}
                >
                    {isHighScore ? 'Immortalize Score' : 'Challenge Again'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VictoryModal;

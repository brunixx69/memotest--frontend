import { useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { ScoreEntry } from '../hooks/useLeaderboard';
import { Difficulty } from '../hooks/useMemoryGame';

interface LeaderboardProps {
    scores: Record<Difficulty, ScoreEntry[]>;
}

const Leaderboard = ({ scores }: LeaderboardProps) => {
    const [tabIndex, setTabIndex] = useState(0);
    const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const currentDifficulty = difficulties[tabIndex];
    const currentScores = scores[currentDifficulty];

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return '🥇'; // Gold
            case 1: return '🥈'; // Silver
            case 2: return '🥉'; // Bronze
            default: return `${index + 1}`;
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 500, mt: 4, bgcolor: '#1E293B', borderRadius: 2, overflow: 'hidden', border: '1px solid #334155' }}>
            <Typography variant="h6" sx={{ p: 2, textAlign: 'center', color: '#F8FAFC', borderBottom: '1px solid #334155' }}>
                Leaderboard
            </Typography>

            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="secondary"
                indicatorColor="secondary"
                sx={{ borderBottom: '1px solid #334155' }}
            >
                <Tab label="Easy" sx={{ color: '#94A3B8' }} />
                <Tab label="Medium" sx={{ color: '#94A3B8' }} />
                <Tab label="Hard" sx={{ color: '#94A3B8' }} />
            </Tabs>

            <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#64748B' }} align="center">Rank</TableCell>
                            <TableCell sx={{ color: '#64748B' }}>Name</TableCell>
                            <TableCell sx={{ color: '#64748B' }} align="right">Moves</TableCell>
                            <TableCell sx={{ color: '#64748B' }} align="right">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentScores.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ color: '#94A3B8', py: 4 }}>
                                    No scores yet. Be the first!
                                </TableCell>
                            </TableRow>
                        ) : (
                            currentScores.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" sx={{ color: '#F8FAFC', fontSize: '1.2rem' }}>
                                        {getRankIcon(index)}
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{ color: '#F8FAFC', fontWeight: 'bold' }}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: '#A78BFA' }}>{row.moves}</TableCell>
                                    <TableCell align="right" sx={{ color: '#60A5FA' }}>{row.time}s</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Leaderboard;

import GameBoard from './components/GameBoard';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0F172A', // Slate 900 matches container
            paper: '#1E293B',
        },
        primary: {
            main: '#3B82F6',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <GameBoard />
        </ThemeProvider>
    );
}

export default App;

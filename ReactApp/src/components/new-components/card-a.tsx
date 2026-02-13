import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { useCardMessageStore } from 'src/store/card-message-store';

// ----------------------------------------------------------------------

export function CardA() {
    const sendMessage = useCardMessageStore((state: { sendMessage: (message: string) => void }) => state.sendMessage);

    const handleSendMessage = () => {
        const timestamp = new Date().toLocaleTimeString();
        sendMessage(`Card A event ${timestamp}`);
    };

    return (
        <Box
            sx={{
                mb: { xs: 0, md: 0 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Card
                sx={{
                    width: 345,
                    height: 320,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        height: 140,
                        bgcolor: '#ADD8E6', // Light blue
                    }}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Card A
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions sx={{ mt: 'auto' }}>
                    <Button size="small" color="primary" onClick={handleSendMessage}>
                        Event &apos;Card B&apos;
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}


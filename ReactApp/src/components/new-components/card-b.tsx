import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { useCardMessageStore } from 'src/store/card-message-store';

// ----------------------------------------------------------------------

export function CardB() {
    const message = useCardMessageStore((state: { message: string }) => state.message);
    const clearMessage = useCardMessageStore((state: { clearMessage: () => void }) => state.clearMessage);

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
                        bgcolor: '#FFB6C1', // Light red
                    }}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Card B
                    </Typography>
                    {message ? (
                        <Box
                            sx={{
                                p: 1.5,
                                bgcolor: 'success.lighter',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'success.main',
                            }}
                        >
                            <Typography variant="body2" sx={{ color: 'success.darker', fontWeight: 500 }}>
                                Received: {message}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    )}
                </CardContent>
                <CardActions sx={{ mt: 'auto' }}>
                    <Button size="small" color="primary" onClick={clearMessage} disabled={!message}>
                        Clear Message
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}


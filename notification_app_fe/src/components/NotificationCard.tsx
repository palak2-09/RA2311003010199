import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, Fade } from '@mui/material';
import type { NotificationType } from '../api';

interface Props {
    notification: NotificationType;
    isViewed: boolean;
    onMarkViewed: (id: string) => void;
}

const typeColors: Record<string, 'primary' | 'secondary' | 'success'> = {
    Placement: 'primary',
    Result: 'secondary',
    Event: 'success'
};

export const NotificationCard: React.FC<Props> = ({ notification, isViewed, onMarkViewed }) => {
    return (
        <Fade in={true} timeout={500}>
            <Card 
                sx={{ 
                    mb: 3, 
                    position: 'relative',
                    overflow: 'visible',
                    borderLeft: isViewed ? '1px solid rgba(255,255,255,0.05)' : '4px solid #ec4899',
                    opacity: isViewed ? 0.6 : 1,
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 20px 40px -15px rgba(124, 58, 237, 0.4)',
                        opacity: 1,
                        borderColor: 'rgba(255,255,255,0.2)'
                    }
                }}
            >
                {/* Glow effect for new notifications */}
                {!isViewed && (
                    <Box sx={{
                        position: 'absolute', top: -1, left: -4, width: 4, height: '100%',
                        boxShadow: '0 0 20px #ec4899', borderRadius: '4px 0 0 4px'
                    }} />
                )}

                <CardContent sx={{ p: 3, cursor: isViewed ? 'default' : 'pointer' }} onClick={() => { if (!isViewed) onMarkViewed(notification.ID); }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: 'wrap' }}>
                            {!isViewed && (
                                <Chip 
                                    label="NEW" 
                                    size="small" 
                                    sx={{ 
                                        fontWeight: 800, 
                                        background: 'linear-gradient(45deg, #ec4899, #f43f5e)',
                                        color: '#fff',
                                        letterSpacing: 1,
                                        boxShadow: '0 4px 10px rgba(236, 72, 153, 0.3)'
                                    }} 
                                />
                            )}
                            <Chip 
                                label={notification.Type} 
                                color={typeColors[notification.Type] || 'default'} 
                                size="small" 
                                variant={isViewed ? "outlined" : "filled"}
                                sx={{ fontWeight: 600 }}
                            />
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, letterSpacing: 0.5, opacity: 0.8 }}>
                                {notification.Timestamp}
                            </Typography>
                        </Box>
                        
                        {!isViewed && (
                            <Button 
                                size="small" 
                                variant="outlined"
                                color="secondary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onMarkViewed(notification.ID);
                                }}
                                sx={{ borderRadius: 20, px: 2, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                            >
                                Mark Read
                            </Button>
                        )}
                    </Box>
                    <Typography variant="h6" sx={{ mt: 1.5, fontWeight: 500, lineHeight: 1.4, color: 'text.primary' }}>
                        {notification.Message}
                    </Typography>
                </CardContent>
            </Card>
        </Fade>
    );
};

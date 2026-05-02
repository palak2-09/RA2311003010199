import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Fade } from '@mui/material';
import { fetchNotifications } from '../api';
import type { NotificationType } from '../api';
import { NotificationCard } from '../components/NotificationCard';

export const AllNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const stored = localStorage.getItem('viewed_notifications');
        if (stored) {
            setViewedIds(new Set(JSON.parse(stored)));
        }
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        setLoading(true);
        const { data, error } = await fetchNotifications();
        if (error) setErrorMsg(error);
        setNotifications(data);
        setLoading(false);
    };

    const handleMarkViewed = (id: string) => {
        const newViewed = new Set(viewedIds);
        newViewed.add(id);
        setViewedIds(newViewed);
        localStorage.setItem('viewed_notifications', JSON.stringify(Array.from(newViewed)));
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    return (
        <Container maxWidth="md">
            <Fade in={true} timeout={800}>
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                        Your Updates
                    </Typography>
                    
                    {errorMsg && (
                        <Box sx={{ p: 3, mb: 4, bgcolor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: 2 }}>
                            <Typography color="error" sx={{ fontWeight: 'bold' }}>API Connection Error:</Typography>
                            <Typography color="error">{errorMsg}</Typography>
                        </Box>
                    )}

                    {notifications.map(noti => (
                        <NotificationCard 
                            key={noti.ID} 
                            notification={noti} 
                            isViewed={viewedIds.has(noti.ID)}
                            onMarkViewed={handleMarkViewed}
                        />
                    ))}
                    {notifications.length === 0 && (
                        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 8, fontSize: '1.2rem' }}>
                            You're all caught up!
                        </Typography>
                    )}
                </Box>
            </Fade>
        </Container>
    );
};

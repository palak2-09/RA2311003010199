import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, TextField, Fade } from '@mui/material';
import { fetchNotifications } from '../api';
import type { NotificationType } from '../api';
import { NotificationCard } from '../components/NotificationCard';

export const PriorityInbox: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
    const [limit, setLimit] = useState<number>(10);
    const [typeFilter, setTypeFilter] = useState<string>('All');

    useEffect(() => {
        const stored = localStorage.getItem('viewed_notifications');
        if (stored) {
            setViewedIds(new Set(JSON.parse(stored)));
        }
    }, []);

    useEffect(() => {
        loadPriorityNotifications();
    }, [limit, typeFilter]);

    const loadPriorityNotifications = async () => {
        setLoading(true);
        const params: any = { limit };
        if (typeFilter !== 'All') {
            params.notification_type = typeFilter;
        }
        
        const { data, error } = await fetchNotifications(params);
        if (error) setErrorMsg(error);
        
        const typePriority: Record<string, number> = { Placement: 3, Result: 2, Event: 1 };
        
        const sorted = data.map(n => ({
            ...n,
            score: (typePriority[n.Type] || 0) * 1000000000000 + new Date(n.Timestamp).getTime()
        })).sort((a, b) => b.score - a.score);

        setNotifications(sorted.slice(0, limit));
        setLoading(false);
    };

    const handleMarkViewed = (id: string) => {
        const newViewed = new Set(viewedIds);
        newViewed.add(id);
        setViewedIds(newViewed);
        localStorage.setItem('viewed_notifications', JSON.stringify(Array.from(newViewed)));
    };

    return (
        <Container maxWidth="md">
            <Fade in={true} timeout={500}>
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        mb: 4,
                        flexWrap: 'wrap',
                        gap: 3
                    }}>
                        <Typography variant="h4">
                            Priority Inbox
                        </Typography>
                        <Box sx={{ 
                            display: "flex", 
                            gap: 2,
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            p: 1.5,
                            borderRadius: 3,
                            alignItems: 'center'
                        }}>
                            <FormControl size="small" sx={{ minWidth: 140 }}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={typeFilter}
                                    label="Type"
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <MenuItem value="All">All Types</MenuItem>
                                    <MenuItem value="Placement">Placement</MenuItem>
                                    <MenuItem value="Result">Result</MenuItem>
                                    <MenuItem value="Event">Event</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField 
                                type="number" 
                                label="Top N" 
                                size="small" 
                                value={limit} 
                                onChange={(e) => setLimit(Number(e.target.value))} 
                                sx={{ width: 100, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                inputProps={{ min: 1 }}
                            />
                        </Box>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                            <CircularProgress size={60} thickness={4} />
                        </Box>
                    ) : (
                        <>
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
                            {notifications.length === 0 && !errorMsg && (
                                <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 8, fontSize: '1.2rem' }}>
                                    No priority notifications available.
                                </Typography>
                            )}
                        </>
                    )}
                </Box>
            </Fade>
        </Container>
    );
};

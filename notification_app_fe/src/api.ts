import axios from 'axios';
import { logger } from './logger';

export interface NotificationType {
    ID: string;
    Type: 'Placement' | 'Result' | 'Event';
    Message: string;
    Timestamp: string;
}

const API_URL = "/evaluation-service/notifications";

// IMPORTANT: Paste the Authorization Token you received from the Pre-Test Setup here!
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwczQ5MDlAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDM4OCwiaWF0IjoxNzc3NzAzNDg4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzcyNjM2YjUtM2JkZC00OGViLWE3NjctMGIyMjk3YWVjNjU0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicGFsYWsgc2luZ2giLCJzdWIiOiJlMTJlNGViMy04NGZmLTQ2NjQtODRlOC1jMWM2ZGM2MzQ4OWQifSwiZW1haWwiOiJwczQ5MDlAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJwYWxhayBzaW5naCIsInJvbGxObyI6InJhMjMxMTAwMzAxMDE5OSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImUxMmU0ZWIzLTg0ZmYtNDY2NC04NGU4LWMxYzZkYzYzNDg5ZCIsImNsaWVudFNlY3JldCI6Im1QZmN6dUpWZ0hFTlV1a20ifQ.u1eiJoypoPoQE5nN15jWI0J2yBSh3OaQQ-jp7SudHRw";

export const fetchNotifications = async (
    params?: { limit?: number; page?: number; notification_type?: string }
): Promise<{ data: NotificationType[], error: string | null }> => {
    try {
        logger.info('Fetching notifications', { params });
        const response = await axios.get(API_URL, { 
            params,
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`
            }
        });
        return { data: response.data.notifications || [], error: null };
    } catch (error: any) {
        logger.error('Error fetching notifications', { error: error.message });
        return { 
            data: [], 
            error: error.response?.status === 401 
                ? '401 Unauthorized: The API requires an Authentication Token (Protected Route). Please add your token from the Pre-Test Setup.'
                : error.message 
        };
    }
};

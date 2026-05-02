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
const AUTH_TOKEN = "PASTE_YOUR_TOKEN_HERE";

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

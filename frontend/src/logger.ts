export const logger = {
    info: (message: string, meta?: any) => {
        const logEntry = {
            level: 'INFO',
            message,
            meta,
            timestamp: new Date().toISOString()
        };
        // Storing in localStorage instead of console logging as per requirements
        const existingLogs = JSON.parse(localStorage.getItem('app_logs') || '[]');
        existingLogs.push(logEntry);
        localStorage.setItem('app_logs', JSON.stringify(existingLogs.slice(-100))); // keep last 100
    },
    error: (message: string, meta?: any) => {
        const logEntry = {
            level: 'ERROR',
            message,
            meta,
            timestamp: new Date().toISOString()
        };
        const existingLogs = JSON.parse(localStorage.getItem('app_logs') || '[]');
        existingLogs.push(logEntry);
        localStorage.setItem('app_logs', JSON.stringify(existingLogs.slice(-100)));
    }
};

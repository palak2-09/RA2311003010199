const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'system.log');

const logger = {
    info: (message, meta = {}) => {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: 'INFO',
            message,
            ...meta
        };
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    },
    error: (message, meta = {}) => {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: 'ERROR',
            message,
            ...meta
        };
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    }
};

module.exports = logger;

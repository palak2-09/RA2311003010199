const axios = require("axios");

//API
const API_URL = "http://20.207.122.201/evaluation-service/notifications";

// Type priority mapping
const typePriority = {
    Placement: 3,
    Result: 2,
    Event: 1
};

// Function to fetch notifications
async function getNotifications() {
    try {
        const response = await axios.get(API_URL);
        return response.data.notifications;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return [];
    }
}

// Function to calculate priority score
function calculateScore(notification) {
    const typeScore = typePriority[notification.Type] || 0;

    // Convert timestamp to number
    const timeScore = new Date(notification.Timestamp).getTime();

    return typeScore * 1000000000000 + timeScore;
}

// Function to get top N notifications
function getTopNotifications(notifications, n = 10) {
    return notifications
        .map(noti => ({
            ...noti,
            score: calculateScore(noti)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, n);
}

// Main function
async function main() {
    console.log("Fetching notifications...");

    const notifications = await getNotifications();

    console.log("Data received:", notifications);

    const topNotifications = getTopNotifications(notifications, 10);

    console.log("\nTop Priority Notifications:\n");

    topNotifications.forEach((n, index) => {
        console.log(`${index + 1}. [${n.Type}] ${n.Message} - ${n.Timestamp}`);
    });
}
// Run program
main();
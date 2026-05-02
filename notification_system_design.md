# Stage 1

## My Approach for the Priority Inbox

### 1. Figuring out Priority
The problem asked to show top notifications based on weight (Placement > Result > Event) and how recent they are.

### 2. How I calculated the scores
To sort them properly, I decided to give each notification a score.
- I assigned weights: `Placement = 3`, `Result = 2`, `Event = 1`.
- Then, I converted the `Timestamp` into a standard Javascript timestamp (milliseconds).
- To make sure the type weight is always more important than the time, I multiplied the type weight by a huge number (1,000,000,000,000) and then just added the timestamp.
- This way, any Placement notification will always score higher than a Result, but between two Placements, the newer one wins because its timestamp is bigger.

### 3. Getting the top N
I mapped over the fetched notifications, added the `score` property to each, sorted the array in descending order based on that score, and then used `.slice(0, 10)` to grab the top 10. This is all done locally without needing any database queries.

### 4. Handling new notifications efficiently
If this was a real system where notifications keep coming in constantly, sorting the whole array every time would be too slow. A better way to handle this would be using a Min-Heap (Priority Queue) with a fixed size of 10. When a new notification comes, we just compare it to the smallest item in the heap and swap it if needed. This keeps it fast and efficient!

### 5. Logging Middleware
As requested in the setup stage, I replaced `console.log` with a custom logger in `logger.js`. It takes the messages, formats them, and appends them to a `system.log` file instead of printing directly to the terminal.

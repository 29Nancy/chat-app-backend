const WebSocket = require("ws");

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (data) => {
        console.log(`Received: ${data}`);

        const parsedData = JSON.parse(data);
        const userMessage = parsedData.message;

        const botReply = `You said: ${userMessage}`;

        ws.send(JSON.stringify({ message: botReply })); 
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server running on ws://localhost:8080");

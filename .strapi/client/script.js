document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendBtn = document.getElementById("send-btn");

    // Connect to WebSocket server
    const socket = new WebSocket("ws://localhost:8080");

    // Event listener for receiving messages
    socket.addEventListener("message", function (event) {
        const data = JSON.parse(event.data);
        displayMessage(data.message, "bot-message");  
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === "") return;

        displayMessage(message, "user-message");

        // Send message to WebSocket server
        socket.send(JSON.stringify({ message }));

        messageInput.value = "";
    }

    function displayMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", className);
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

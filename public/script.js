const socket = io(); 
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", () => {
  sendMessage();
});
// Enter key
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        sendMessage();
    }
});
function sendMessage() {
  const messageValue = messageInput.value;
  socket.emit("client-message", messageValue);
  const messageText = messageInput.value.trim();

  if (messageText !== "") {
    const chatContainer = document.querySelector(".chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "right");
    messageDiv.textContent = messageText;
    chatContainer.appendChild(messageDiv);
    messageInput.value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

socket.on("server-message", (messageData) => {
    console.log(messageData.sender , socket.id);
    if (messageData.sender !== socket.id) {
    const chatContainer = document.querySelector(".chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "left");
    messageDiv.textContent = messageData.message;
    chatContainer.appendChild(messageDiv);
    messageInput.value = "";

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
});

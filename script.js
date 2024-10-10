function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  const chatBox = document.getElementById("chat-box");

  if (userInput.trim() !== "") {
    const userMessage = document.createElement("div");
    userMessage.textContent = "Du: " + userInput;
    chatBox.appendChild(userMessage);

    const botResponse = document.createElement("div");
    botResponse.textContent = "Bot: Detta är ett automatiskt svar.";
    chatBox.appendChild(botResponse);

    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

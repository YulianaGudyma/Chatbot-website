async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    if (userInput.trim() !== "") {
        // Visa användarens meddelande i chatboxen
        const userMessage = document.createElement("div");
        userMessage.textContent = "Du: " + userInput;
        chatBox.appendChild(userMessage);

        // Skriv ut "tänker..." medan vi väntar på ett svar
        const botLoadingMessage = document.createElement("div");
        botLoadingMessage.textContent = "Bot: Tänker...";
        chatBox.appendChild(botLoadingMessage);

        try {
            // Anropa Glitch-backend för att skicka användarens fråga till OpenAI
            const response = await fetch("https://sugary-tangible-lemming.glitch.me/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: userInput,
                }),
            });

            const data = await response.json();
            botLoadingMessage.textContent = "Bot: " + data.response;

        } catch (error) {
            botLoadingMessage.textContent = "Bot: Ett fel inträffade, försök igen senare.";
            console.error("Error:", error);
        }

        // Scrolla till botten av chatboxen och rensa användarens inputfält
        chatBox.scrollTop = chatBox.scrollHeight;
        document.getElementById("user-input").value = "";
    }
}

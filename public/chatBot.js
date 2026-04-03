(function () {
  const api_url = "http://localhost:3000/api/chat";

  const scriptTag = document.currentScript;
  const ownerId = scriptTag.getAttribute("data-owner-id");

  if (!ownerId) {
    console.error("Owner ID is required for the chat bot.");
    return;
  }

  // 👉 Inject styles
  const style = document.createElement("style");
  style.innerHTML = `
    .chat-msg {
      display: flex;
      margin-bottom: 8px;
      font-size: 13px;
    }

    .chat-msg.user {
      justify-content: flex-end;
    }

    .chat-msg.bot {
      justify-content: flex-start;
    }

    .bubble {
      max-width: 75%;
      padding: 8px 12px;
      border-radius: 14px;
      line-height: 1.4;
      word-wrap: break-word;
    }

    .user .bubble {
      background: #000;
      color: #fff;
      border-bottom-right-radius: 4px;
    }

    .bot .bubble {
      background: #f1f1f1;
      color: #333;
      border-bottom-left-radius: 4px;
    }

    .typing {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .typing span {
      width: 6px;
      height: 6px;
      background: #555;
      border-radius: 50%;
      animation: bounce 1.2s infinite;
    }

    .typing span:nth-child(2) { animation-delay: 0.2s; }
    .typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.3;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  const button = document.createElement("div");
  button.innerHTML = "💬";

  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "black",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: "1000",
  });

  document.body.append(button);

  const chatWindow = document.createElement("div");
  Object.assign(chatWindow.style, {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "320px",
    height: "420px",
    borderRadius: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    display: "none",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "system-ui, sans-serif",
  });

  chatWindow.innerHTML = `
    <div style="background:#000;color:#fff;padding:12px;font-size:14px;display:flex;justify-content:space-between;">
      <span> Customer Support</span>
      <span id="chat-close" style="cursor:pointer;">✕</span>
    </div>
  `;

  const messagesContainer = document.createElement("div");
  Object.assign(messagesContainer.style, {
    flex: "1",
    padding: "10px",
    overflowY: "auto",
    background: "#fafafa",
  });

  const inputContainer = document.createElement("div");
  inputContainer.style.display = "flex";
  inputContainer.style.padding = "10px";
  inputContainer.style.borderTop = "1px solid #eeaea";

  const inputField = document.createElement("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendButton.click();
    }
  });

  inputField.type = "text";
  inputField.placeholder = "Type a message...";

  Object.assign(inputField.style, {
    flex: "1",
    padding: "8px",
    border: "1px solid #000",
    borderRadius: "8px",
    fontSize: "13px",
    outline: "none",
    boxShadow: "none",
  });

  const sendButton = document.createElement("button");
  sendButton.innerHTML = "Send";

  Object.assign(sendButton.style, {
    marginLeft: "8px",
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
    fontSize: "13px",
  });

  inputContainer.append(inputField, sendButton);
  chatWindow.append(messagesContainer, inputContainer);
  document.body.append(chatWindow);

  button.addEventListener("click", () => {
    chatWindow.style.display =
      chatWindow.style.display === "none" ? "flex" : "none";
  });

  document.getElementById("chat-close").addEventListener("click", () => {
    chatWindow.style.display = "none";
  });

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `chat-msg ${type}`;

    msg.innerHTML = `<div class="bubble">${text}</div>`;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return msg;
  }

  sendButton.addEventListener("click", async () => {
    const message = inputField.value.trim();
    if (!message) return;

    addMessage(message, "user");
    inputField.value = "";

    const typingMsg = document.createElement("div");
    typingMsg.className = "chat-msg bot";
    typingMsg.innerHTML = `
      <div class="bubble">
        <div class="typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingMsg);

    try {
      const response = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerID: ownerId, message }),
      });

      const data = await response.json();

      messagesContainer.removeChild(typingMsg);

      addMessage(data?.reply || "⚠️ No response", "bot");
    } catch (error) {
      messagesContainer.removeChild(typingMsg);
      addMessage("⚠️ Server error", "bot");
    }
  });
})();

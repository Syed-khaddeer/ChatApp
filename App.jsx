import { useState } from "react";
import "./App.css";

function App() {

  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

  // Store textbox message
  const [message, setMessage] = useState("");

  // Store all chat messages
  const [messages, setMessages] = useState([]);

  // Send message function
  function sendMessage() {

    if (message.trim() === "") {
      return;
    }

    // Select random username
    const randomIndex = Math.floor(Math.random() * user_list.length);

    const username = user_list[randomIndex];

    // Create new message
    const newMessage = {
      id: Date.now(),
      username: username,
      text: message,
      likes: 0
    };

    // Add message to chat
    setMessages([...messages, newMessage]);

    // Clear textbox
    setMessage("");
  }

  // Like button function
  function likeMessage(id) {

    const updatedMessages = messages.map((msg) => {

      if (msg.id === id) {
        return {
          ...msg,
          likes: msg.likes + 1
        };
      }

      return msg;

    });

    setMessages(updatedMessages);
  }

  return (

    <div className="chat-container">

      <h2>React Chat Application</h2>

      {/* Display Messages */}

      <div className="chat-box">

        {messages.map((msg) => (

          <div className="message" key={msg.id}>

            <div className="username">
              {msg.username}
            </div>

            <div className="message-content">

              <p>{msg.text}</p>

              <button
                className="like-button"
                onClick={() => likeMessage(msg.id)}
              >
                👍 {msg.likes}
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Message Input */}

      <div className="input-area">

        <input
          type="text"
          placeholder="Type Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  );
}

export default App;
import React, { useState } from "react";
import axios from "axios";

export default function ChatComponent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    const res = await axios.post("http://localhost:5000/chat", { prompt: input });
    setMessages(prev => [...prev, { sender: "bot", text: res.data.response }]);
    setInput("");
  };

  return (
    <div style={{
      padding: "20px",
      backgroundColor: "#282c34", 
      color: "#f0f0f0",           
      fontFamily: "cursive",
      minHeight: "100vh",          
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",   
      alignItems: "center"        
    }}>
      <h1 style={{ color: "#61dafb", marginBottom: "30px", fontFamily: "cursive" }}>AI Assistant</h1> {}
      <div style={{
        marginBottom: "20px",
        width: "60%",
        maxWidth: "800px", 
        backgroundColor: "#3a3f47", 
        borderRadius: "15px",      
        padding: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", 
        overflowY: "auto", 
        maxHeight: "60vh" 
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start", 
              marginBottom: "10px"
            }}
          >
            <div style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: "10px", 
              margin: "5px 0",
              maxWidth: "70%", 
              wordBreak: "break-word", 
              backgroundColor: msg.sender === "user" ? "#3a3f40" : "#3a3f40", 
              color: "#ffffff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", 
              fontFamily: "cursive" 
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        display: "flex",
        width: "60%", 
        maxWidth: "800px",
        marginTop: "10px"
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{
            flexGrow: 1, 
            padding: "12px 15px",
            marginRight: "10px",
            borderRadius: "25px", 
            border: "#3a3f47", 
            backgroundColor: "#495057", 
            color: "#ffffff", 
            outline: "none",
            fontWeight: "bold",
            fontFamily: "cursive"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "12px 25px",
            borderRadius: "25px", 
            backgroundColor: "#495057", 
            color: "#ffffff", 
            cursor: "pointer",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
            fontWeight: "bold",
            fontFamily: "cursive",
            border: "2px solid #495057"

          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
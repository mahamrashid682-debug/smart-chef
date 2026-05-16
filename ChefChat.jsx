import React, { useState } from "react";
import { Bot, Send } from "lucide-react";
import { api } from "../api/client";

export default function ChefChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([{ from: "chef", text: "Ask me how to fix taste, texture, missing ingredients, or recipe steps." }]);
  const [busy, setBusy] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;
    const question = message.trim();
    setChat((items) => [...items, { from: "user", text: question }]);
    setMessage("");
    setBusy(true);
    try {
      const data = await api("/assistant/chat", { method: "POST", body: JSON.stringify({ message: question }) });
      setChat((items) => [...items, { from: "chef", text: data.reply }]);
    } catch (error) {
      setChat((items) => [...items, { from: "chef", text: error.message }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel chatPanel">
      <div className="panelTitle"><Bot size={20} /><h2>Smart Chef Chatbot</h2></div>
      <div className="chatWindow">
        {chat.map((item, index) => <p className={item.from === "user" ? "userBubble" : "chefBubble"} key={index}>{item.text}</p>)}
      </div>
      <form className="inlineForm" onSubmit={sendMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask a cooking question..." />
        <button disabled={busy}><Send size={17} /> Send</button>
      </form>
    </section>
  );
}

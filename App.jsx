import { useState } from "react";
import { sendMessageToGroq } from "./services/aiService";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    const aiReply = await sendMessageToGroq(newMessages);
    const aiMsg = { role: "assistant", content: aiReply };
    setMessages([...newMessages, aiMsg]);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#007BFF'}}></div>
          <h1 className="text-xl font-bold">AI Tracker</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user"? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === "user"? "text-white rounded-br-none" : "bg-[#1F1F1F] text-gray-300 rounded-bl-none"}`}
              style={{ backgroundColor: msg.role === "user"? '#007BFF' : '' }}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-2 bg-[#1F1F1F] rounded-full px-4 py-2">
          <button>📎</button>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Tulis pesan..." className="flex-1 bg-transparent outline-none" />
          <button>🎤</button>
          <button onClick={handleSend} className="p-2 rounded-full" style={{ backgroundColor: '#007BFF' }}>⬆️</button>
        </div>
      </div>
    </div>
  )
  }

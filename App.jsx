import React, { useState } from 'react';
import { askAI } from './aiService';

function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!input) return;
    const userMsg = { role: 'user', text: input };
    setChat([...chat, userMsg]);
    setInput('');
    
    const aiReply = await askAI(input);
    setChat(prev => [...prev, { role: 'ai', text: aiReply }]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a' }}>
      <div style={{ width: '90%', maxWidth: '500px', background: '#007BFF', borderRadius: '12px', padding: '20px', color: 'white' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>AI Tracker</h2>
        
        <div style={{ height: '300px', overflowY: 'auto', background: '#001f3f', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
          {chat.map((msg, i) => (
            <p key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.text}</p>
          ))}
        </div>

        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ketik pesan..." 
          style={{ width: '70%', padding: '10px', borderRadius: '8px', border: 'none' }} 
        />
        <button onClick={handleSend} style={{ width: '25%', padding: '10px', marginLeft: '5%', background: 'white', color: '#007BFF', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
          Kirim
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { askAI } from './services/aiService';

export default function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState(['Halo! Aku AI Tracker 🤖']);

  const handleSend = async () => {
    if (!input) return;
    const newChat = [...chat, `Kamu: ${input}`];
    setChat(newChat);
    setInput('');
    const aiReply = await askAI(input);
    setChat([...newChat, `AI: ${aiReply}`]);
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',background:'#0a0a0a'}}>
      <div style={{width:'90%',maxWidth:500,background:'#007BFF',borderRadius:12,padding:20,color:'white'}}>
        <h2 style={{textAlign:'center',marginBottom:15}}>AI Tracker</h2>
        <div style={{height:300,overflowY:'auto',background:'#001f3f',padding:10,borderRadius:8,marginBottom:10}}>
          {chat.map((m,i)=><p key={i} style={{margin:'5px 0'}}>{m}</p>)}
        </div>
        <div style={{display:'flex'}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyPress={e=>e.key==='Enter'&&handleSend()} placeholder="Ketik pesan..." style={{flex:1,padding:10,borderRadius:8,border:'none'}}/>
          <button onClick={handleSend} style={{marginLeft:10,padding:'10px 20px',background:'white',color:'#007BFF',border:'none',borderRadius:8,fontWeight:'bold'}}>Kirim</button>
        </div>
      </div>
    </div>
  )
          }

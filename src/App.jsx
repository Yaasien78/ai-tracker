import React, { useState, useRef } from 'react';
import { askAI } from './services/aiService';

export default function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState(['AI: Halo! Aku bisa chat, suara, sama upload file 🤖']);
  const [listening, setListening] = useState(false);
  const fileRef = useRef(null);

  // 1. FUNGSI KIRIM PESAN
  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    const userMsg = `Kamu: ${text}`;
    setChat(prev => [...prev, userMsg]);
    setInput('');
    const reply = await askAI(text);
    setChat(prev => [...prev, `AI: ${reply}`]);
  };

  // 2. FUNGSI MODE SUARA
  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser kamu gak support voice");

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      handleSend(transcript);
    };
    recognition.onend = () => setListening(false);
  };

  // 3. FUNGSI UPLOAD FILE
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChat(prev => [...prev, `Kamu upload: ${file.name}`]);
        handleSend(`Ini isi file ${file.name}: ${reader.result.substring(0,500)}`);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',background:'#0a0a0a',padding:20}}>
      <div style={{width:'100%',maxWidth:500,background:'#007BFF',borderRadius:12,padding:20,color:'white'}}>
        <h2 style={{textAlign:'center'}}>AI Tracker</h2>

        <div style={{height:300,overflowY:'auto',background:'#001f3f',padding:10,borderRadius:8,margin:'15px 0'}}>
          {chat.map((m,i)=><p key={i} style={{margin:'8px 0',whiteSpace:'pre-wrap'}}>{m}</p>)}
        </div>

        <div style={{display:'flex',gap:8,marginBottom:10}}>
          <button onClick={handleVoice} style={{padding:10,background: listening? 'red' : 'white', color:'#007BFF',border:'none',borderRadius:8,fontWeight:'bold'}}>🎤</button>
          <button onClick={()=>fileRef.current.click()} style={{padding:10,background:'white',color:'#007BFF',border:'none',borderRadius:8,fontWeight:'bold'}}>📎</button>
          <input type="file" ref={fileRef} onChange={handleFile} style={{display:'none'}} accept=".txt,.pdf,.docx,.jpg,.png"/>
        </div>

        <div style={{display:'flex',gap:10}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyPress={e=>e.key==='Enter'&&handleSend()} placeholder="Ketik atau pakai mic..." style={{flex:1,padding:10,borderRadius:8,border:'none'}}/>
          <button onClick={()=>handleSend()} style={{padding:'10px 20px',background:'white',color:'#007BFF',border:'none',borderRadius:8,fontWeight:'bold'}}>Kirim</button>
        </div>
      </div>
    </div>
  )
      }

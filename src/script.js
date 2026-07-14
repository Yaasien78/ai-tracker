const chatArea = document.getElementById('chatArea');
const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const clearBtn = document.getElementById('clearBtn');
const muteBtn = document.getElementById('muteBtn');
let muted = false;

function addMessage(text, sender) {
  // hapus welcome kalau ada chat baru
  if(chatArea.querySelector('.welcome')) chatArea.innerHTML = '';
  
  const bubble = document.createElement('div');
  bubble.className = `bubble ${sender}`;
  bubble.textContent = text;
  chatArea.appendChild(bubble);
  chatArea.scrollTop = chatArea.scrollHeight;
}

async function sendMessage() {
  const text = promptInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  promptInput.value = '';
  addMessage('Thinking...', 'ai');
  
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({prompt: text})
    });
    const data = await res.json();
    chatArea.lastChild.textContent = data.reply || "AI error";
  } catch(e) {
    chatArea.lastChild.textContent = 'Error: Gagal konek ke AI. Cek GEMINI_API_KEY';
  }
}

// 1. Tombol Kirim
sendBtn.onclick = sendMessage;

// 2. Enter di keyboard
promptInput.onkeypress = e => { if(e.key==='Enter') sendMessage() };

// 3. 3 Tombol Suggest
document.querySelectorAll('.suggest').forEach(btn=>{
  btn.onclick = () => { 
    promptInput.value = btn.textContent; 
    sendMessage(); 
  }
});

// 4. Tombol Tong Sampah
clearBtn.onclick = () => { 
  chatArea.innerHTML = `
  <div class="welcome">
    <div class="welcome-icon">⚡</div>
    <h2>What can I do for you?</h2>
    <p>Type your request or use the buttons below to start with AI Tracker.</p>
    <button class="suggest">Making RAB and Project</button>
    <button class="suggest">Creating Gardens and Buildings</button>
    <button class="suggest">Repairing machines and making machines</button>
  </div>` 
  // aktifin lagi event suggest setelah di reset
  document.querySelectorAll('.suggest').forEach(btn=>{
    btn.onclick = () => { promptInput.value = btn.textContent; sendMessage(); }
  });
};

// 5. Tombol Mute Speaker
muteBtn.onclick = () => {
  muted = !muted;
  muteBtn.textContent = muted ? '🔊' : '🔇';
}

// 6. Tombol Mic - sementara alert dulu
micBtn.onclick = () => {
  alert('Fitur Voice belum dipasang. Nanti kita tambah Web Speech API')
}

const chatArea = document.getElementById('chatArea');
const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const clearBtn = document.getElementById('clearBtn');
const muteBtn = document.getElementById('muteBtn');
let muted = false;

function addMessage(text, sender) {
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
    chatArea.lastChild.textContent = 'Error: Gagal konek ke AI';
  }
}

sendBtn.onclick = sendMessage;
promptInput.onkeypress = e => { if(e.key==='Enter') sendMessage() };

document.querySelectorAll('.suggest').forEach(btn=>{
  btn.onclick = () => { promptInput.value = btn.textContent; sendMessage(); }
});

clearBtn.onclick = () => { 
  chatArea.innerHTML = `<div class="welcome"><div class="welcome-icon"></div><h2>What can I do for you?</h2></div>` 
};

muteBtn.onclick = () => {
  muted = !muted;
  muteBtn.textContent = muted ? '🔊' : '🔇';
                }

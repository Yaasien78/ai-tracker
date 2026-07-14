const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const chatArea = document.getElementById('chatArea');
const clearBtn = document.getElementById('clearBtn');

sendBtn.addEventListener('click', sendMessage);
promptInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

clearBtn.addEventListener('click', () => {
  chatArea.innerHTML = `
    <div class="welcome">
      <div class="welcome-icon">💬</div>
      <h2>Ada yang bisa dibantu?</h2>
      <p>Ketik, rekam suara, atau unggah file untuk mulai mengobrol dengan AI Tracker.</p>
      <button class="suggest">Ringkas dokumen yang saya unggah</button>
      <button class="suggest">Bantu saya menulis email</button>
      <button class="suggest">Jelaskan topik ini dengan sederhana</button>
    </div>
  `;
  attachSuggestListeners();
});

async function sendMessage() {
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  // hapus welcome screen kalau ada
  if (chatArea.querySelector('.welcome')) chatArea.innerHTML = '';

  addMessage(prompt, 'user');
  promptInput.value = '';

  addMessage('Sedang mengetik...', 'ai', true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    
    removeLoading();
    addMessage(data.reply || 'Gagal dapat jawaban', 'ai');
  } catch (err) {
    removeLoading();
    addMessage('Error: ' + err.message, 'ai');
  }
}

function addMessage(text, sender, isLoading = false) {
  const msg = document.createElement('div');
  msg.classList.add('bubble', sender);
  if(isLoading) msg.id = 'loading';
  msg.innerText = text;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function removeLoading() {
  const loading = document.getElementById('loading');
  if(loading) loading.remove();
}

function attachSuggestListeners() {
  document.querySelectorAll('.suggest').forEach(btn => {
    btn.onclick = () => {
      promptInput.value = btn.innerText;
      sendMessage();
    }
  });
}

attachSuggestListeners();

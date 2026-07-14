const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const chatArea = document.getElementById('chatArea');
const clearBtn = document.getElementById('clearBtn');
const micBtn = document.getElementById('micBtn');

sendBtn.addEventListener('click', sendMessage);
promptInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

clearBtn.addEventListener('click', () => {
  chatArea.innerHTML = `
  <div class="welcome">
    <div class="welcome-icon">💬</div>
    <h2>What can I do for you?</h2>
    <p>Type your request or use the buttons below to start with AI Tracker.</p>
    <button class="suggest">Making RAB and Project</button>
    <button class="suggest">Creating Gardens and Buildings</button>
    <button class="suggest">Repairing machines and making machines</button>
  </div>`;
  attachSuggestListeners(); // <-- ini penting biar tombol hidup lagi
});

async function sendMessage() {
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  if (chatArea.querySelector('.welcome')) chatArea.innerHTML = '';

  addMessage(prompt, 'user');
  promptInput.value = '';
  addMessage("Sedang mengetik...", 'ai', true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    removeLoading();
    addMessage(data.reply || "Gagal dapat jawaban", 'ai');
  } catch (err) {
    removeLoading();
    addMessage("Error: " + err.message, 'ai');
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
      sendMessage(); // langsung kirim
    }
  });
}

// Panggil pertama kali pas load
attachSuggestListeners();

// FITUR MICROPHONE
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'id-ID';

  micBtn.addEventListener('click', () => {
    micBtn.style.background = '#3b82f6';
    recognition.start();
  });

  recognition.onresult = (event) => {
    promptInput.value = event.results[0][0].transcript;
    sendMessage();
  };

  recognition.onend = () => {
    micBtn.style.background = '#1a1a1a';
  };
} else {
  micBtn.style.display = 'none';
                             }

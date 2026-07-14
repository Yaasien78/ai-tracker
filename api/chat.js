export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({error: 'Method not allowed'});

  try {
    // Vercel kadang perlu ini biar body kebaca
    const body = typeof req.body === 'string'? JSON.parse(req.body) : req.body;
    const { prompt } = body;

    if (!prompt) return res.status(400).json({error: 'Prompt kosong'});

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return res.status(500).json({error: 'GROQ_API_KEY tidak ditemukan di Vercel'});

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({error: data.error?.message || 'Groq error'});

    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }

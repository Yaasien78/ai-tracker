export default async function handler(req, res) {
  // biar gak CORS error
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(200).json({ error: "Prompt kosong" });
    if (!process.env.GROQ_API_KEY) return res.status(200).json({ error: "GROQ_API_KEY belum di set di Vercel" });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(200).json({ error: `Groq Error ${response.status}: ${data.error?.message}` });
    }

    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(200).json({ error: "Server Error: " + error.message });
  }
                                   }

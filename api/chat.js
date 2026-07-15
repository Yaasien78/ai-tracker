export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({error: 'Method not allowed'});

  const { prompt } = req.body;
  const API_KEY = process.env.GROQ_API_KEY;

  if (!API_KEY) return res.status(500).json({error: 'GROQ_API_KEY belum diset di Vercel'});

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",// paling cepat di groq
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await response.json();

    if(data.error) return res.status(500).json({error: data.error.message});

    const reply = data.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }

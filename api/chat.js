export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method!== 'POST') return res.status(200).json({reply: "Pake POST bro"});

  try {
    const { prompt } = req.body;
    
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt || "halo" }]
      })
    });

    const d = await r.json();
    return res.status(200).json({ reply: d.choices[0].message.content });
    
  } catch (e) {
    return res.status(200).json({ error: e.message });
  }
}

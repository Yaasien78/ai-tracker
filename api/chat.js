export default async function handler(req, res) {
  const { prompt } = req.body;
  const apiKey = process.env.VITE_GROQ_API_KEY;

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
  res.json({ reply: data.choices[0].message.content });
}

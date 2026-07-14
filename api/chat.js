export const config = { api: { bodyParser: true } }

export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({error: 'Method not allowed'});

  try {
    const body = typeof req.body === 'string'? JSON.parse(req.body) : req.body;
    const { prompt } = body;
    console.log("Prompt:", prompt); // biar keliatan di log

    const apiKey = process.env.GROQ_API_KEY;
    console.log("Key ada:",!!apiKey); // cek key kebaca apa nggak
    if (!apiKey) return res.status(500).json({error: 'GROQ_API_KEY tidak ditemukan'});

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }] })
    });

    const data = await response.json();
    console.log("Groq Response:", data); // ini penting buat debug

    if (data.error) return res.status(500).json({error: data.error.message});
    if (!data.choices) return res.status(500).json({error: 'Response dari Groq kosong'});

    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
      }

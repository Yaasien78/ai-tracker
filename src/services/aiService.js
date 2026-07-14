export async function askAI(prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}

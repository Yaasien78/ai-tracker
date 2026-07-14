export const sendMessageToGroq = async (messages) => {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({ model: "llama-3.1-8b-instant", messages: messages }),
  });
  const data = await response.json();
  return data.choices[0].message.content;
};

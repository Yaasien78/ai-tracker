export async function askAI(prompt) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  return "API Key kebaca: " + apiKey; // TEST DOANG
}

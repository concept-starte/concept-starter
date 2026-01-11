export const config = {
  runtime: "nodejs"
};
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { projectType, siteDescription } = req.body;

  if (!projectType || !siteDescription) {
    return res.status(400).send("Missing input data");
  }

  const prompt = `
You are an architectural academic assistant specialized in design studio projects.

Generate a clear, buildable architectural concept direction.

Project Type:
${projectType}

Site Description:
${siteDescription}

OUTPUT STRUCTURE:
1. CONCEPT DIRECTION (1 concise paragraph)
2. DESIGN STRATEGY (4–6 bullet points)
3. KEYWORDS (5 architectural keywords)
4. DIAGRAM IDEAS (short bullet points)

Use formal academic architectural English.
Avoid generic phrases.
Focus on spatial logic and concept clarity.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).send("AI response error");
    }

    res.status(200).send(data.choices[0].message.content);

  } catch (error) {
    res.status(500).send("Server error");
  }
}

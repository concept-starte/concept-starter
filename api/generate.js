export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { projectType, siteDescription } = req.body;

  const prompt = `
You are an architectural academic assistant.

Generate a clear architectural concept direction.

Project Type:
${projectType}

Site Description:
${siteDescription}

OUTPUT:
- Concept direction paragraph
- 5 design keywords
`;

  res.status(200).send(prompt);
}

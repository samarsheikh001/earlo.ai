import openai from "../../lib/openaiSetup";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const prompt = req.body.prompt;
    
    try {
      const result = await generator(prompt);
      res.status(200).json(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

async function generator(prompt) {
  console.log(
    prompt
  );

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt,
    temperature: 0.5,
    max_tokens: 120,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    stop: ["Student:"],
  });
  console.log(response.data.choices);

  return response.data.choices;
}

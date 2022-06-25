import openai from "../../lib/openaiSetup";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const prompt = req.body.prompt;
    console.log(prompt);
    
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
    temperature: 0,
    max_tokens: 120,
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1,
  });
  console.log(response.data.choices);

  return response.data.choices;
}

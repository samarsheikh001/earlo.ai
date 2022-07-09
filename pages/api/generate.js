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
  console.log(prompt);

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

  const contentFilter = await openai.createCompletion({
    model: "content-filter-alpha",
    prompt: "<|endoftext|>" + response.data.choices[0].text + "\n--\nLabel:",
    temperature: 0,
    max_tokens: 1,
    top_p: 0,
    logprobs: 10,
  });
  console.log(response.data.choices);
  if (contentFilter.data.choices[0].text === "0") {
    return response.data.choices;
  } else {
    return [{ text: "[Charley's response was flagged by our content filters. If you believe this was by accident, send us an email.]" }];
  }
}

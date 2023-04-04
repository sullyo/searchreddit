import { OpenAIModel } from "@/types";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import { Configuration, OpenAIApi } from "openai";

import { oneLine } from "@/lib/utils";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
// export const openAiGptTurbo = async (prompt: string) => {
//   const openai = new OpenAIApi(configuration);
//   const completion = await openai.createChatCompletion(
//     {
//       model: OpenAIModel.GPT_TURBO,
//       messages: [
//         {
//           role: "system",
//           content:
//             "You search engine for reddit who, given sources and content, provides 2-3 sentence answers for a users question. Be original conside, accurate and helpful. Cite sources as [1] or [2] or [3] or [4] after each sentence (not just the very end) to back up your answer (Ex: Correct: [1], Correct: [2][3], Incorrect: [1, 2]",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       max_tokens: 200,
//       temperature: 0.0,
//       stream: true,
//     },
//     { responseType: "stream" }
//   );

//   if (completion.status !== 200) {
//     throw new Error("OpenAI API returned an error");
//   }
//   return completion.data.choices[0].message?.content;
// };

export const OpenAIStream = async (prompt: string) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.GPT_TURBO,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that accurately answers the user's queries based on the given text. The user beleives this is a search engine for the site reddit.com, and the text you are given are comments from that website.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.0,
      stream: true,
    }),
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};

export const openAiEmbed = async (input: string) => {
  const openai = new OpenAIApi(configuration);
  const embeddingResponse = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: input,
  });

  if (embeddingResponse.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }
  return embeddingResponse.data.data[0].embedding;
};

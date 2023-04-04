import { NextApiRequest, NextApiResponse } from "next";
import { SearchResult } from "@/types";

import { OpenAIStream } from "@/lib/openai";
import { oneLine } from "@/lib/utils";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { sources } = (await req.json()) as {
      sources: SearchResult[];
    };

    if (!sources) {
      return new Response("Unable to process request", { status: 400 });
    }

    const prompt = oneLine`Provide a 2-3 sentence answer to the query based on 
    the following sources. Be original, concise, accurate, and helpful. 
    Cite sources as [1] or [2] or [3] or [4] after each sentence (not just the very end) 
    to back up your answer (Ex: Correct: [1], Correct: [2][3], Incorrect: [1, 2, 3, 4], Incorrect: [1], [2], [3],[4]]).
    ${sources
      .map(
        (source, idx) => `Source [${idx + 1}]:\n${source.comments.join(" ")}`
      )
      .join("\n\n")}
    `;

    const stream = await OpenAIStream(prompt);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;

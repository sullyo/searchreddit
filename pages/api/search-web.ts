import type { NextApiRequest, NextApiResponse } from "next";
import { SearchResult } from "@/types";

import { search } from "@/lib/scraper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult[] | String>
) {
  if (req.method === "POST") {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).send("No search query provided");
      }

      const results = await search(query);

      res.status(200).json(results);
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Issue querying Error: ${err.message}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

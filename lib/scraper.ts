import { SearchResult } from "@/types";
import * as cheerio from "cheerio";
import googleIt from "google-it";

interface GoogleItResult {
  title: string;
  link: string;
  snippet: string;
  date: string;
}
interface RedditPost {
  selfText: string;
  topComments: string[];
  date: string;
  subreddit: string;
}

async function fetchTop5RedditResults(
  searchTerm: string
): Promise<GoogleItResult[]> {
  const results = await googleIt({
    query: `${searchTerm} site:reddit.com`,
  });
  const top5Results: GoogleItResult[] = results
    .slice(0, 4)
    .map((result: any) => {
      const title = result.title.replace(" - Reddit", "");
      const date = result.snippet
        .slice(0, result.snippet.indexOf("·"))
        .slice(0, -2);
      return {
        title,
        link: result.link,
        snippet: result.snippet,
        date: Date.parse(date) ? date : "-",
      };
    });

  return top5Results;
}

const getRedditOldPost = async (url: string): Promise<RedditPost> => {
  const oldRedditUrl = url.replace("www", "old");
  const response = await fetch(oldRedditUrl);
  const html = await response.text();
  const $ = cheerio.load(html);
  const selfText = $('div[id="siteTable"] div.usertext-body').text();
  const topComments = $('div[class="commentarea"] div.usertext-body')
    .slice(0, 3)
    .map((_, el) => $(el).text().slice(0, 1500))
    .get();

  const date = $('div[id="siteTable"] time').text();

  const parts = url.split("/");
  const subredditIndex = parts.indexOf("r") + 1;
  const subreddit = parts[subredditIndex];
  return { selfText, topComments, date, subreddit };
};

export async function search(searchTerm: string): Promise<SearchResult[]> {
  const top5Results = await fetchTop5RedditResults(searchTerm);
  const scrapedResults: SearchResult[] = [];
  const contents = await Promise.all(
    top5Results.map((result) => getRedditOldPost(result.link))
  );

  for (let i = 0; i < top5Results.length; i++) {
    const result = top5Results[i];
    const content = contents[i];
    scrapedResults.push({
      title: result.title,
      link: result.link,
      date: result.date == "-" ? content.date : result.date,
      content: content.selfText,
      comments: content.topComments,
      preview: result.snippet,
      subreddit: content.subreddit,
    });
  }

  return scrapedResults;
}

// export async function getSubmissionBody(url: string): Promise<string> {
//   try {
//     const response = await apiClient.post(
//       "https://sullyo--reddit-fetcher-fastapi-app.modal.run/api/reddit",
//       { url }
//     );

//     const data = response.data;
//     return data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }

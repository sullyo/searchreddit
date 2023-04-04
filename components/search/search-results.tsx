import { useState } from "react";
import { SearchResult } from "@/types";
import { useQuery } from "@tanstack/react-query";

import apiClient from "@/lib/axios";
import { cn } from "@/lib/utils";
import Loader from "./loader";
import { SearchBar } from "./search-bar";

async function searchQuery(query: string): Promise<SearchResult[]> {
  const response = await apiClient.post("/api/search-web", { query });
  return response.data;
}

export function SearchResults({ query }: { query: string }) {
  const [streamingLoading, setStreamingLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [answer, setAnswer] = useState("");

  const {
    data,
    isLoading: searchLoading,
    error,
  } = useQuery([`search-${query}`], () => searchQuery(query), {
    onSuccess: (data) => {
      setSearchResults(data);
      handleStream(data);
    },
    enabled: !!query,
  });

  const isLoading = searchLoading || streamingLoading;

  const handleStream = async (sources: SearchResult[]) => {
    try {
      setStreamingLoading(true);
      setAnswer("");

      const response = await fetch("/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sources }),
      });

      if (!response.ok) {
        setStreamingLoading(false);
        throw new Error(response.statusText);
      }

      setStreamingLoading(false);
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setAnswer((prev) => prev + chunkValue);
      }
    } catch (err) {
      setAnswer("Error");
    }
  };

  return (
    <div className="mx-auto grid max-w-2xl gap-2 pt-6 pb-8 md:py-10 ">
      <h1 className="text-lg font-semibold sm:text-2xl">{query}</h1>
      {isLoading ? <Loader /> : <p className="text-medium ">{answer}</p>}
      <div className="border-t py-1" />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className="text-sm font-medium">{searchResults.length} sources </p>
          <div className="flex flex-col gap-y-4 ">
            {searchResults.map((result, index) => (
              <div key={index} className="border-b pb-2">
                <div className="flex flex-row items-center gap-x-2">
                  <p
                    className={cn(
                      "my-1.5 w-fit whitespace-nowrap rounded-full  px-2.5 py-0.5 text-xs font-medium",
                      "bg-zinc-100 dark:bg-zinc-800"
                    )}
                  >
                    /r/{result.subreddit.toLowerCase()}
                  </p>
                  <p className="text-sm font-medium ">
                    <span className="text-lg">• </span>
                    {result.date.slice(0, 15)}
                  </p>
                </div>
                <a
                  target="_blank"
                  href={result.link}
                  className="font-bold  hover:text-blue-500 md:text-lg"
                  rel="noopener noreferrer"
                >
                  {index + 1}. {result.title}
                </a>
                <p className="text-sm leading-relaxed">{result.preview}</p>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <SearchBar placeholder="Ask another question" />
          </div>
        </>
      )}
    </div>
  );
}

// Function that alternates between 4 colors depending on the index
function getColor(index: number) {
  const colors = ["bg-teal-700", "bg-cyan-700", "bg-red-700", "bg-purple-800"];
  return colors[index % 4];
}

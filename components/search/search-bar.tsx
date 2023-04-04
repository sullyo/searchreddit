import { useState } from "react";
import { useRouter } from "next/router";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar({ placeholder }: { placeholder?: string }) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("q", search);
    router.push("/search" + "?" + params.toString());
  };

  return (
    <Input
      placeholder={placeholder || "Ask Reddit anything"}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="h-12 rounded-full border-transparent bg-zinc-100 dark:bg-zinc-800"
      onKeyDown={handleKeyDown}
      IconButton={
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSearch}
          className="ml-1"
        >
          <Icons.search className="mr-2 h-5 w-5 text-sky-900 dark:text-sky-50" />
          <span className="sr-only">Search</span>
        </Button>
      }
      clearable
    />
  );
}
//

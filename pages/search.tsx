import { useEffect, useState } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

import { Layout } from "@/components/layout";
import { SearchResults } from "@/components/search/search-results";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchParamQuery = searchParams.get("q");

  const [search, setSearch] = useState(null);

  useEffect(() => {
    setSearch(searchParamQuery);
  }, [searchParamQuery]);

  return (
    <Layout>
      <Head>
        <title>{search} - Reddit Search</title>
        <meta name="Reddit Search" content="Search Reddit with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container">
        <SearchResults query={search} />
      </section>
    </Layout>
  );
}

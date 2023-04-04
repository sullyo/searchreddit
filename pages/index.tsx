import Head from "next/head";

import { Layout } from "@/components/layout";
import { SearchBar } from "@/components/search/search-bar";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>SearchReddit: Ask Reddit anything </title>
        <meta
          name="description"
          content="SearchReddit is a search engine for Reddit. Ask anything and get answers from your fellow Redditors."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="h-full min-h-[105vh] lg:min-h-[100vh]">
        <div className="mx-auto h-full w-full max-w-screen-2xl">
          <div className="mx-auto flex h-full w-full max-w-screen-md items-center px-2 pt-12 md:min-h-[70vh] md:px-0 md:pt-0">
            <div className="grow">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

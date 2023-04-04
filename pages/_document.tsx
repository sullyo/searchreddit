import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-white text-zinc-800 antialiased dark:bg-zinc-900 dark:text-zinc-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

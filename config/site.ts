import { NavItem } from "@/types/nav";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
    docs: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "SearchReddit",
  description: "Search engine for Reddit, summarized by chatGPT",
  mainNav: [
    // {
    //   title: "Home",
    //   href: "/",
    // },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};

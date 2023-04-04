export interface SearchResult {
  content: string;
  comments: string[];
  link: string;
  title: string;
  preview: string;
  date: string;
  subreddit: string;
}
export enum OpenAIModel {
  DAVINCI_TEXT = "text-davinci-003",
  CURIE_TEXT = "text-curie-001",
  DAVINCI_CODE = "code-davinci-002",
  GPT_TURBO = "gpt-3.5-turbo",
  GPT4 = "gpt-4",
}

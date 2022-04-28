import { IAbstractGetArticles } from "./IAbstractGetArticles";

export interface IGetAllArticles extends IAbstractGetArticles {
  searchIn?: "title" | "description" | "content";

  domains?: string;
  excludeDomains?: string;

  from?: string;
  to?: string;

  language?: string;

  sortBy?: "relevancy" | "popularity" | "publishedAt";
}

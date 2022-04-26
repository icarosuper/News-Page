export interface IGetAllArticles {
  q?: string;

  searchIn?: "title" | "description" | "content";

  sources?: string;

  domains?: string;
  excludeDomains?: string;

  from?: string;
  to?: string;

  language?: string;

  sortBy?: "relevancy" | "popularity" | "publishedAt";

  pageSize?: number;

  page?: number;
}

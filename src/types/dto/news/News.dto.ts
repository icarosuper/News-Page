import { TArticle } from "../../types";

export interface NewsDto {
  status: string;
  totalResults: number;
  articles: TArticle[];
}

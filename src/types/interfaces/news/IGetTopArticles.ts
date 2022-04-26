import { Country, Category } from "../../types";

export interface IGetTopArticles {
  country?: Country;

  category?: Category;

  sources?: string;

  q?: string;

  pageSize?: number;

  page?: number;
}

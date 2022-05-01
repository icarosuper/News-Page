import { Category } from "../../types";
import { IAbstractGetArticles } from "./IAbstractGetArticles";

export interface IGetTopArticles extends IAbstractGetArticles {
  country?: string;
  category?: Category;
}

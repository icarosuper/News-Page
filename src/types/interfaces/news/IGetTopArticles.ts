import { Country, Category } from "../../types";
import { IAbstractGetArticles } from "./IAbstractGetArticles";

export interface IGetTopArticles extends IAbstractGetArticles {
  country?: Country;
  category?: Category;
}

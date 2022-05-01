import { Source } from "../../types/news/Source";
import { TArticle } from "../../types";
import { IGetTopArticles } from "../news/IGetTopArticles";
import { IGetAllArticles } from "../news/IGetAllArticles";
import React from "react";

export interface INewsContext {
  sources: Source[];
  totalPages: number;
  articles: TArticle[];

  topProps: IGetTopArticles;
  allProps: IGetAllArticles;
  setTopProps: (
    statePartial:
      | Partial<IGetTopArticles>
      | ((currentState: IGetTopArticles) => Partial<IGetTopArticles>)
  ) => void;
  setAllProps: (
    statePartial:
      | Partial<IGetAllArticles>
      | ((currentState: IGetAllArticles) => Partial<IGetAllArticles>)
  ) => void;

  search: string;
  setSearch: (
    value: string | React.ChangeEvent<any> | null | undefined
  ) => void;

  page: number;
  setPage: (page: number) => void;

  selectedSources: string[];
  setSelectedSources: (sources: string[]) => void;

  language: string;
  setLanguage: (
    value: string | React.ChangeEvent<any> | null | undefined
  ) => void;
}

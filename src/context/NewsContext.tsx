import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLoading } from "../hooks/useLoading";
import { NewsRepository } from "../repositories/NewsRepository";
import { TArticle } from "../types/types";
import { IGetAllArticles, IGetTopArticles } from "../types/interfaces";
import { Source } from "../types/types/news/Source";

interface INewsContext {
  sources: Source[];
  totalPages: number;
  articles: TArticle[];
  getAllArticles: (props?: IGetAllArticles) => Promise<void>;
  getTopArticles: (props?: IGetTopArticles) => Promise<void>;
}

export const NewsContext = createContext<INewsContext>({} as INewsContext);

export const NewsProvider: FC = ({ children }: any) => {
  const { openLoading, closeLoading } = useLoading();
  const repository = useMemo(() => new NewsRepository(), []);

  const pageSize = 10;
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [sources, setSources] = useState<Source[]>([]);

  const getSources = useCallback(async () => {
    try {
      const response = await repository.getSources();
      setSources(response.sources);
    } catch (e) {
      setSources([]);
      console.error("Sources não encontradas");
    }
  }, [repository]);

  const getTopArticles = useCallback(
    async (props?: IGetTopArticles) => {
      try {
        openLoading();

        const response = await repository.findTop({
          country: "br", // todo Adicionar localização por IP
          pageSize,
          ...props,
        });

        setTotalPages(Math.ceil(response.totalResults / pageSize));

        setArticles(response.articles);
      } catch (e) {
        // todo fazer algo?
      } finally {
        closeLoading();
      }
    },
    [closeLoading, openLoading, repository]
  );

  const getAllArticles = useCallback(
    async (props?: IGetAllArticles) => {
      try {
        openLoading();

        const response = await repository.findAll({
          pageSize,
          language: "br", // todo Adicionar enum de linguas e localização por IP,
          ...props,
        });

        setTotalPages(Math.ceil(response.totalResults / pageSize));

        setArticles(response.articles);
      } catch (e) {
        // todo fazer algo?
      } finally {
        closeLoading();
      }
    },
    [closeLoading, openLoading, repository]
  );

  useEffect(() => {
    (async () => await getSources())();
  }, [getSources]);

  return (
    <NewsContext.Provider
      value={{ articles, getTopArticles, getAllArticles, sources, totalPages }}
    >
      {children}
    </NewsContext.Provider>
  );
};

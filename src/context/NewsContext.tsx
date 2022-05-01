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
import { useInputState, useSetState } from "@mantine/hooks";

interface INewsContext {
  sources: Source[];
  totalPages: number;
  articles: TArticle[];

  page: number;
  setPage: (page: number) => void;

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
}

export const NewsContext = createContext<INewsContext>({} as INewsContext);

export const NewsProvider: FC = ({ children }: any) => {
  const { openLoading, closeLoading } = useLoading();
  const repository = useMemo(() => new NewsRepository(), []);

  const pageSize = 10;

  const [articles, setArticles] = useState<TArticle[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [sources, setSources] = useState<Source[]>([]);
  const [topProps, setTopProps] = useSetState<IGetTopArticles>({});
  const [allProps, setAllProps] = useSetState<IGetAllArticles>({});
  const [q, setSearch] = useInputState("");

  const shouldSearchAll = useCallback(
    () =>
      allProps.searchIn ||
      allProps.domains ||
      allProps.excludeDomains ||
      allProps.from ||
      allProps.to ||
      allProps.language ||
      allProps.sortBy,
    []
  );

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

  useEffect(() => {
    (async () => {
      if (shouldSearchAll()) await getAllArticles({ ...allProps, q, page });
      else await getTopArticles({ ...topProps, q, page });
    })();
  }, [allProps, topProps, q, page]);

  useEffect(() => setPage(1), [allProps, topProps, q]);

  return (
    <NewsContext.Provider
      value={{
        page,
        setPage,
        setSearch,
        allProps,
        setAllProps,
        topProps,
        setTopProps,
        totalPages,
        articles,
        sources,
        search: q,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

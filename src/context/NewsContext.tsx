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
import {
  IGetAllArticles,
  IGetTopArticles,
  INewsContext,
} from "../types/interfaces";
import { Source } from "../types/types/news/Source";
import { useInputState, useSetState } from "@mantine/hooks";
import { Languages } from "../types/objects_types";

export const NewsContext = createContext<INewsContext>({} as INewsContext);

export const NewsProvider: FC = ({ children }: any) => {
  const { openLoading, closeLoading } = useLoading();
  const repository = useMemo(() => new NewsRepository(), []);

  const [sources, setSources] = useState<Source[]>([]);
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [q, setSearch] = useInputState("");
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useInputState(Languages.PT.value);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const [topProps, setTopProps] = useSetState<IGetTopArticles>({
    pageSize: 10,
  });
  const [allProps, setAllProps] = useSetState<IGetAllArticles>({
    pageSize: 10,
  });

  const shouldSearchAll = () =>
    !!q ||
    !!allProps.searchIn ||
    !!allProps.domains ||
    !!allProps.excludeDomains ||
    !!allProps.from ||
    !!allProps.to ||
    (!!allProps.sortBy && (!!q || selectedSources.length > 0));

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
    async (props: IGetTopArticles) => {
      try {
        openLoading();

        const response = await repository.findTop({
          ...props,
          language: props.sources?.length !== 0 ? undefined : props.language,
        });

        setTotalPages(
          Math.ceil(response.totalResults / (props?.pageSize || 1))
        );

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
    async (props: IGetAllArticles) => {
      try {
        openLoading();

        const response = await repository.findAll({
          ...props,
          language: props.sources?.length !== 0 ? undefined : props.language,
          sortBy:
            props.sources?.length !== 0 || props.q ? props.sortBy : undefined,
        });

        setTotalPages(
          Math.ceil(response.totalResults / (props?.pageSize || 1))
        );

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
      if (shouldSearchAll()) {
        await getAllArticles({
          ...allProps,
          q,
          page,
          language,
          sources: selectedSources,
        });
      } else
        await getTopArticles({
          ...topProps,
          q,
          page,
          language,
          sources: selectedSources,
        });
    })();
  }, [allProps, topProps, q, page, language, selectedSources]);

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
        language,
        setLanguage,
        selectedSources,
        setSelectedSources,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

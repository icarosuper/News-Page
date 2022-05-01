import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Pagination, ScrollArea, Stack, Text, TextInput } from "@mantine/core";
import { ArticleCard } from "./ArticleCard";
import { useNews } from "../../hooks/useNews";
import { useDebouncedValue, useInputState, useSetState } from "@mantine/hooks";
import { IGetAllArticles, IGetTopArticles } from "../../types/interfaces";

export const NewsContainer: FC = () => {
  const viewport = useRef<HTMLDivElement>();

  const { articles, getTopArticles, getAllArticles, totalPages } = useNews();

  const [topProps, setTopProps] = useSetState<IGetTopArticles>({});
  const [allProps, setAllProps] = useSetState<IGetAllArticles>({});

  const [page, setPage] = useState(1);
  const [search, setSearch] = useInputState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

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

  const scrollToTop = () => {
    viewport.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setPage(1);
    scrollToTop();
  }, [topProps, allProps, debouncedSearch]);

  useEffect(() => {
    (async () => {
      if (shouldSearchAll())
        await getAllArticles({ ...allProps, q: debouncedSearch, page });
      else await getTopArticles({ ...topProps, q: debouncedSearch, page });

      scrollToTop();
    })();
  }, [allProps, topProps, debouncedSearch, page]);

  return (
    <Stack align={"center"} sx={{ height: "100%" }} spacing={"sm"} py={"sm"}>
      <TextInput
        placeholder="Digite aqui para pesquisar"
        label="Pesquisar"
        radius="md"
        maxLength={50}
        value={search}
        onChange={setSearch}
        size={"md"}
        sx={{ width: "40%" }}
      />

      <ScrollArea
        p={10}
        type="always"
        offsetScrollbars
        // @ts-ignore
        viewportRef={viewport}
        sx={{ width: "50%" }}
      >
        <Stack spacing={"sm"}>
          {articles.length === 0 ? (
            <Text size={"xl"} color={"white"} my={15} mx={"auto"}>
              Nenhum resultado encontrado
            </Text>
          ) : (
            articles.map((article, i) => (
              <ArticleCard article={article} key={i} />
            ))
          )}
        </Stack>
      </ScrollArea>

      <Pagination
        size="xl"
        withEdges
        total={totalPages}
        boundaries={2}
        siblings={2}
        page={page}
        onChange={(page) => setPage(page)}
      />
    </Stack>
  );
};

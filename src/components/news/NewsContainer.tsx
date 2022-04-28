import { FC, useCallback, useEffect, useRef } from "react";
import { Pagination, ScrollArea, Stack } from "@mantine/core";
import { ArticleCard } from "./ArticleCard";
import { useNews } from "../../hooks/useNews";
import { useSetState } from "@mantine/hooks";
import { IGetAllArticles, IGetTopArticles } from "../../types/interfaces";

export const NewsContainer: FC = () => {
  const viewport = useRef<HTMLDivElement>();

  const { articles, getTopArticles, getAllArticles, totalPages } = useNews();

  const [topProps, setTopProps] = useSetState<IGetTopArticles>({});
  const [allProps, setAllProps] = useSetState<IGetAllArticles>({});

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
    (async () => {
      if (shouldSearchAll()) await getAllArticles(allProps);
      else await getTopArticles(topProps);

      scrollToTop();
    })();
  }, [allProps, topProps, getAllArticles, getTopArticles, shouldSearchAll]);

  return (
    <Stack align={"center"} sx={{ height: "100%" }} spacing={"sm"} py={"sm"}>
      <ScrollArea
        sx={{ width: "50%" }}
        p={10}
        type="always"
        offsetScrollbars
        // @ts-ignore
        viewportRef={viewport}
      >
        <Stack spacing={"sm"}>
          {articles.map((article, i) => (
            <ArticleCard article={article} key={i} />
          ))}
        </Stack>
      </ScrollArea>

      <Pagination
        size="xl"
        withEdges
        total={totalPages}
        boundaries={2}
        siblings={2}
        initialPage={1}
        onChange={(page) => setTopProps({ page })}
      />
    </Stack>
  );
};

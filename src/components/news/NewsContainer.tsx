import { FC, useEffect, useRef, useState } from "react";
import { TArticle } from "../../types/types";
import { Pagination, ScrollArea, Stack } from "@mantine/core";
import { ArticleCard } from "./ArticleCard";
import { NewsRepository } from "../../repositories/NewsRepository";
import { useLoading } from "../../hooks/useLoading";

export const NewsContainer: FC = () => {
  const { openLoading, closeLoading } = useLoading();
  const client = new NewsRepository();
  const pageSize = 10;

  const [articles, setArticles] = useState<TArticle[]>([]);
  const [pages, setPages] = useState(0);

  const viewport = useRef<HTMLDivElement>();

  const getArticles = async (page: number) => {
    openLoading();

    const response = await client.findTop({
      country: "br",
      pageSize,
      page,
    });

    setPages(Math.ceil(response.totalResults / pageSize));
    setArticles(response.articles);

    viewport.current?.scrollTo({ top: 0, behavior: "smooth" });

    closeLoading();
  };

  useEffect(() => {
    (async () => await getArticles(1))();
  }, []);

  return (
    <Stack align={"center"}>
      <ScrollArea
        style={{ height: "80vh", width: "40%" }}
        p={10}
        type="always"
        offsetScrollbars
        // @ts-ignore
        viewportRef={viewport}
      >
        {articles.map((article, i) => (
          <ArticleCard article={article} key={i} />
        ))}
      </ScrollArea>

      <Pagination
        size="xl"
        withEdges
        total={pages}
        boundaries={2}
        siblings={2}
        initialPage={1}
        onChange={async (page) => await getArticles(page)}
      />
    </Stack>
  );
};

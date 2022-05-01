import { FC, useEffect, useRef } from "react";
import { useNews } from "../../hooks/useNews";
import { ScrollArea, Stack, Text } from "@mantine/core";
import { ArticleCard } from "./ArticleCard";

export const Articles: FC = () => {
  const { articles, page, topProps, allProps, search } = useNews();
  const viewport = useRef<HTMLDivElement>();

  useEffect(
    () => viewport.current?.scrollTo({ top: 0, behavior: "smooth" }),
    [page, topProps, allProps, search]
  );

  return (
    <ScrollArea
      p={10}
      type="always"
      offsetScrollbars
      // @ts-ignore
      viewportRef={viewport}
      sx={{ height: "100%" }}
    >
      <Stack spacing={"md"}>
        {articles.length === 0 ? (
          <Text size={"xl"} color={"white"} m={"auto"}>
            Nenhum resultado encontrado
          </Text>
        ) : (
          articles.map((article, i) => (
            <ArticleCard article={article} key={i} />
          ))
        )}
      </Stack>
    </ScrollArea>
  );
};

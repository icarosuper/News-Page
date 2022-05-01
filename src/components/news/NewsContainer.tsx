import { FC } from "react";
import { Box, Group, Stack } from "@mantine/core";
import { Searchbar } from "./search/Searchbar";
import { Articles } from "./Articles";
import { ArticlePagination } from "./search/ArticlePagination";
import { LanguageSelector } from "./search/LanguageSelector";
import { SortBySelector } from "./search/SortBySelector";
import { SourceSelector } from "./search/SourceSelector";

export const NewsContainer: FC = () => {
  return (
    <Group sx={{ height: "100%" }} py={"md"}>
      <Stack sx={{ width: "24.5%", height: "100%" }} spacing={"xl"} pl={"xl"}>
        <LanguageSelector />
        <SortBySelector />
        <SourceSelector />
      </Stack>

      <Group
        position={"apart"}
        sx={{
          height: "100%",
          width: "50%",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "75%" }}>
          <Searchbar />
        </Box>

        <Box sx={{ height: "80%" }}>
          <Articles />
        </Box>

        <ArticlePagination />
      </Group>
    </Group>
  );
};

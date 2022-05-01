import { FC } from "react";
import { Accordion, Box, Grid, Group, Stack } from "@mantine/core";
import { Searchbar } from "./search/Searchbar";
import { Articles } from "./Articles";
import { ArticlePagination } from "./search/ArticlePagination";
import { LanguageSelector } from "./search/LanguageSelector";
import { SortBySelector } from "./search/SortBySelector";
import { SourceSelector } from "./search/SourceSelector";

export const NewsContainer: FC = () => {
  return (
    <Grid sx={{ height: "100%" }} p={"xl"} gutter={50}>
      <Grid.Col span={12} lg={3}>
        <Accordion initialItem={-1}>
          <Accordion.Item label="Filtros">
            <Stack spacing={"xl"}>
              <LanguageSelector />
              <SortBySelector />
              <SourceSelector />
            </Stack>
          </Accordion.Item>
        </Accordion>
      </Grid.Col>

      <Grid.Col span={12} lg={6} sx={{ height: "100%" }}>
        <Group
          sx={{
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "75%" }}>
            <Searchbar />
          </Box>

          <Box sx={{ maxHeight: "78%" }}>
            <Articles />
          </Box>

          <ArticlePagination />
        </Group>
      </Grid.Col>
    </Grid>
  );
};

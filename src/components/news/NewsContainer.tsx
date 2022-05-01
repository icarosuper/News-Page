import { FC } from "react";
import { Box, Group, Stack } from "@mantine/core";
import { Searchbar } from "./search/Searchbar";
import { Articles } from "./Articles";
import { ArticlePagination } from "./search/ArticlePagination";

export const NewsContainer: FC = () => {
  return (
    <Group position={"apart"} sx={{ height: "100%" }} py={"md"}>
      <Stack sx={{ width: "22%" }}>a</Stack>

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

      <Stack sx={{ width: "22%" }}>a</Stack>
    </Group>
  );
};

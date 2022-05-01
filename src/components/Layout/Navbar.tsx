import { FC } from "react";
import { Group, Paper, Text } from "@mantine/core";

export const Navbar: FC = () => {
  return (
    <Paper py={15} px={30} radius={0}>
      <Group position={"apart"}>
        <Text size={"lg"}>A melhor página de notícias</Text>
      </Group>
    </Paper>
  );
};

import { FC } from "react";
import { Group, Image, Paper, Text } from "@mantine/core";

export const Navbar: FC = () => {
  return (
    <Paper px={15} radius={0}>
      <Group position={"apart"}>
        <Text size={"xl"} m="md">
          A melhor página de notícias
        </Text>

        <Group>
          <Image src={"asdasd"} />
          <Text size={"lg"}>Usuário</Text>
        </Group>
      </Group>
    </Paper>
  );
};

import { FC } from "react";
import { Group, Image, Paper, Text } from "@mantine/core";

export const Navbar: FC = () => {
  return (
    <Paper shadow={"md"} px={10}>
      <Group position={"apart"}>
        <Text size={"xl"} m="">
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

import { FC } from "react";
import { Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import { TArticle } from "../../types/types";
import { formatDate } from "../../utils/formatDate";

interface Props {
  article: TArticle;
}

export const ArticleCard: FC<Props> = ({
  article: { title, description, publishedAt, url, urlToImage, source },
}) => {
  return (
    <Card
      component={"a"}
      href={url}
      shadow={"md"}
      my={10}
      px={20}
      radius={"md"}
    >
      <Stack spacing={10} align={"stretch"}>
        <Text size={"lg"} mx={""}>
          {title}
        </Text>

        <Group position={"apart"}>
          <Group>
            <Image
              src={urlToImage}
              width={25}
              height={25}
              radius={"xl"}
              alt=""
            />
            <Text size={"md"}>{source.name}</Text>
          </Group>

          <Text size={"md"}>{formatDate(publishedAt)}</Text>
        </Group>

        <Text size={"sm"}>{description}</Text>

        <Button fullWidth component={"a"} href={url}>
          Continue lendo
        </Button>
      </Stack>
    </Card>
  );
};

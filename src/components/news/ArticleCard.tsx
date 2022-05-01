import { FC } from "react";
import { Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import { TArticle } from "../../types/types";
import { formatDate } from "../../utils/formatDate";

interface Props {
  article: TArticle;
}

export const ArticleCard: FC<Props> = ({
  article: { title, description, author, publishedAt, url, urlToImage, source },
}) => {
  return (
    <Card
      component={"a"}
      target={"_blank"}
      href={url}
      shadow={"md"}
      px={20}
      radius={"md"}
      sx={{ width: "100%" }}
    >
      <Stack spacing={"sm"} align={"stretch"}>
        <Text size={"lg"} mx={0}>
          {title}
        </Text>

        <Group position={"apart"}>
          <Group spacing={5}>
            {urlToImage && (
              <Image
                src={urlToImage}
                width={25}
                height={25}
                radius={"xl"}
                alt=""
              />
            )}
            <Text>{source.name}</Text>
            {author && <Text>- {author}</Text>}
          </Group>

          <Text size={"md"}>{formatDate(publishedAt)}</Text>
        </Group>

        <Text size={"sm"}>{description}</Text>

        <Button fullWidth>Continue lendo</Button>
      </Stack>
    </Card>
  );
};

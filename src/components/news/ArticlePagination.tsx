import { FC } from "react";
import { Pagination } from "@mantine/core";
import { useNews } from "../../hooks/useNews";

export const ArticlePagination: FC = () => {
  const { totalPages, page, setPage } = useNews();

  return (
    <Pagination
      size="xl"
      withEdges
      total={totalPages}
      boundaries={2}
      siblings={2}
      page={page}
      onChange={(page) => setPage(page)}
    />
  );
};

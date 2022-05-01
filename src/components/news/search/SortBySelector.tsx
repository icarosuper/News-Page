import { FC } from "react";
import { Select } from "@mantine/core";
import { SortTypes } from "../../../types/objects_types";
import { useNews } from "../../../hooks/useNews";

export const SortBySelector: FC = () => {
  const { allProps, setAllProps } = useNews();

  return (
    <Select
      searchable
      clearable
      label={"Filtrar por"}
      description={"Escolha quais campos do artigo serão pesquisados"}
      placeholder={"Digite para pesquisar"}
      nothingFound={"Nenhum resultado encontrado"}
      value={allProps.sortBy}
      // todo Por algum motivo ele não aceita o "Todos"
      onChange={(value) => setAllProps({ sortBy: value || undefined })}
      data={[{ label: "Todos", value: "" }, ...Object.values(SortTypes)]}
    />
  );
};

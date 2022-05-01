import { FC, useEffect, useState } from "react";
import { MultiSelect, SelectItem } from "@mantine/core";
import { useNews } from "../../../hooks/useNews";

export const SourceSelector: FC = () => {
  const { sources, selectedSources, setSelectedSources } = useNews();

  const [values, setValues] = useState<SelectItem[]>([]);

  useEffect(() => {
    const newValues = sources.map((source) => ({
      label: source.name,
      value: source.id,
      group: source.country,
    }));
    setValues(newValues);
  }, [sources]);

  return (
    <MultiSelect
      searchable
      clearable
      label={"Fontes"}
      description={"Escolha de que fontes você quer receber artigos"}
      placeholder={"Digite aqui para pesquisar"}
      nothingFound={"Nenhum resultado encontrado"}
      value={selectedSources}
      data={values}
      onChange={(values) => setSelectedSources(values)}
    />
  );
};

import { FC } from "react";
import { Select } from "@mantine/core";
import { Languages } from "../../../types/objects_types";
import { useNews } from "../../../hooks/useNews";

export const LanguageSelector: FC = () => {
  const { language, setLanguage, selectedSources } = useNews();

  return (
    <Select
      searchable
      label={"Linguagem"}
      placeholder={"Digite para pesquisar"}
      nothingFound={"Nenhum resultado encontrado"}
      data={Object.values(Languages)}
      value={language}
      onChange={setLanguage}
      disabled={selectedSources.length !== 0}
    />
  );
};

import { FC, useEffect } from "react";
import { useDebouncedValue, useInputState } from "@mantine/hooks";
import { TextInput } from "@mantine/core";
import { useNews } from "../../../hooks/useNews";

export const Searchbar: FC = () => {
  const { search, setSearch } = useNews();

  const [inputSearch, setInputSearch] = useInputState("");
  const [debouncedSearch] = useDebouncedValue(inputSearch, 500);

  useEffect(() => setInputSearch(search), []);
  useEffect(() => setSearch(debouncedSearch), [debouncedSearch]);

  return (
    <TextInput
      placeholder="Digite aqui para pesquisar"
      label="Pesquisar"
      radius="md"
      maxLength={50}
      value={inputSearch}
      onChange={setInputSearch}
      size={"md"}
      sx={{ width: "100%" }}
    />
  );
};

import { Country } from "../index";

export type Source = {
  id: string;
  name: string;
  country: Country;
  category: string;
  description: string;
  url: string;
  language: string;
};

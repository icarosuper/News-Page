import { CSSObject } from "@mantine/styles/lib/tss";
import { MantineTheme } from "@mantine/core";

export const baseStyles: Record<
  string,
  | Record<string, CSSObject>
  | ((theme: MantineTheme, params: any) => Record<string, CSSObject>)
> = {
  Button: (theme) => ({
    root: {
      fontSize: theme.fontSizes.md,
      textTransform: "uppercase",
      borderRadius: 10,
      width: "100%",
      lineHeight: "normal",
      "&:focus": {
        outline: "none",
      },
    },
  }),

  TextInput: (theme) => ({
    label: {
      fontSize: theme.fontSizes.md,
    },

    input: {
      fontSize: theme.fontSizes.md,
      borderColor: "#80808078",
    },
  }),
};

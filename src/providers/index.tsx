import { FC } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { LoadingProvider } from "../context/LoadingContext";
import { Loading } from "../components/Layout/Loading";
import { NewsProvider } from "../context/NewsContext";
import { baseTheme } from "../styles/baseTheme";
import { baseStyles } from "../styles/baseStyles";

export const GlobalProvider: FC = ({ children }: any) => {
  return (
    <MantineProvider theme={baseTheme} styles={baseStyles}>
      <NotificationsProvider>
        <LoadingProvider>
          <NewsProvider>
            {children}
            <Loading />
          </NewsProvider>
        </LoadingProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};

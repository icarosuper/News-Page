import { PropsWithChildren } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { LoadingProvider } from "../context/LoadingContext";
import { Loading } from "../components/Layout/Loading";
import { NewsProvider } from "../context/NewsContext";

export const GlobalProvider: PropsWithChildren<any> = ({ children }: any) => {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
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

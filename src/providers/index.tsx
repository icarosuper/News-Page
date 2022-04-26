import { PropsWithChildren } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { LoadingProvider } from "../context/LoadingContext";
import { Loading } from "../components/Layout/Loading";

export const GlobalProvider: PropsWithChildren<any> = ({ children }: any) => {
  return (
    <MantineProvider>
      <NotificationsProvider>
        <LoadingProvider>
          {children}
          <Loading />
        </LoadingProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};

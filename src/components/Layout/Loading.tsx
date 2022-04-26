import { FC } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useLoading } from "../../hooks/useLoading";

export const Loading: FC = () => {
  const { isLoading } = useLoading();

  return (
    <LoadingOverlay
      visible={isLoading}
      overlayOpacity={0.5}
      transitionDuration={500}
    />
  );
};

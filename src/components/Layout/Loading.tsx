import { FC } from "react";
import { LoadingOverlay } from "@mantine/core";

interface Props {
  isLoading: boolean;
}

export const Loading: FC<Props> = ({ isLoading }: Props) => {
  return (
    <LoadingOverlay
      visible={isLoading}
      overlayOpacity={0.5}
      transitionDuration={500}
    />
  );
};

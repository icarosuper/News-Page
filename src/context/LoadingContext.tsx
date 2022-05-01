import React, { createContext, FC, useCallback, useState } from "react";

interface ILoadingContext {
  isLoading: boolean;
  openLoading: () => void;
  closeLoading: () => void;
}

export const LoadingContext = createContext<ILoadingContext>(
  {} as ILoadingContext
);

export const LoadingProvider: FC = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const openLoading = useCallback(() => setIsLoading(true), [setIsLoading]);
  const closeLoading = useCallback(() => setIsLoading(false), [setIsLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, closeLoading, openLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

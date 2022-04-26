import axios, { AxiosError, AxiosResponse } from "axios";
import { showNotification } from "@mantine/notifications";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const onResponse = (response: AxiosResponse) => {
  return response.data;
};

const onError = (error: AxiosError<any>) => {
  const message = error?.response?.data?.message;

  showNotification({
    title: message || "Ocorreu um erro desconhecido",
    message: message ? null : "Por favor, tente novamente mais tarde",
    color: "red",
  });

  return Promise.reject(message);
};

client.interceptors.response.use(onResponse, onError);

export default client;

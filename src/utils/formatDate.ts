export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("pt-BR");

import AbstractRepository from "./AbstractRepository";
import { IGetAllArticles, IGetTopArticles } from "../types/interfaces";
import { NewsDto } from "../types/dto";

export class NewsRepository extends AbstractRepository {
  findAll(params: IGetAllArticles) {
    return this.client.get<NewsDto>("/v2/everything", {
      params: { ...params, apiKey: this.apiKey },
    });
  }

  findTop(params: IGetTopArticles) {
    return this.client.get<NewsDto>("/v2/top-headlines", {
      params: { ...params, apiKey: this.apiKey },
    });
  }
}

import AbstractRepository from "./AbstractRepository";
import { IGetAllArticles, IGetTopArticles } from "../types/interfaces";
import { NewsDto } from "../types/dto";
import { SourcesDto } from "../types/dto/news/Sources.dto";

export class NewsRepository extends AbstractRepository {
  findAll(params: IGetAllArticles) {
    return this.client.get<NewsDto>("/everything", {
      params: { ...params, apiKey: this.apiKey },
    });
  }

  findTop(params: IGetTopArticles) {
    return this.client.get<NewsDto>("/top-headlines", {
      params: { ...params, apiKey: this.apiKey },
    });
  }

  getSources() {
    return this.client.get<SourcesDto>("/sources", {
      params: { apiKey: this.apiKey },
    });
  }
}

import client from "../services/httpClient";

export default abstract class AbstractRepository {
  protected client = client;
  protected apiKey = process.env.NEXT_PUBLIC_API_KEY;
}

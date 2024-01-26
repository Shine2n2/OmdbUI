import { Movie } from "./movie";

export interface Moviesearch {
  search: Movie[];
  totalResults: string;
  Response: string;
}

import { Movie } from "./movie";

export interface Moviesearch {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

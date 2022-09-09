import { DetailFilm } from "./filmDetail";

export interface FilmData {
    page: number;
    results: Array<DetailFilm>;
}
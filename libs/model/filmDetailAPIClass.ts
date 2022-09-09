import { DetailFilmInterface } from "./filmDetailAPI"

export class ClassDetailFilm {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number

  constructor(
    data: DetailFilmInterface
    ) {
      this.adult = data.adult;
      this.backdrop_path = data.backdrop_path;
      this.belongs_to_collection = data.belongs_to_collection;
      this.budget = data.budget;
      this.genres = data.genres;
      this.homepage = data.homepage;
      this.id = data.id;
      this.imdb_id = data.imdb_id;
      this.original_language = data.original_language;
      this.original_title = data.original_title;
      this.overview = data.overview;
      this.popularity = data.popularity;
      this.poster_path = data.poster_path;
      this.production_companies = data.production_companies;
      this.production_countries = data.production_countries;
      this.release_date = data.release_date;
      this.revenue = data.revenue;
      this.runtime = data.runtime;
      this.spoken_languages = data.spoken_languages;
      this.status = data.status;
      this.tagline = data.tagline;
      this.title = data.title;
      this.video = data.video;
      this.vote_average = data.vote_average;
      this.vote_count = data.vote_count;
    }
}

export class Genre {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string

  constructor(id: number, logo_path: string, name: string, origin_country: string) {
    this.id = id;
    this.logo_path = logo_path;
    this.name = name;
    this.origin_country = origin_country;
  }

  
}

export class ProductionCountry {
  iso_3166_1: string
  name: string

  constructor(iso_3166_1: string, name: string) {
    this.iso_3166_1 = iso_3166_1;
    this.name = name;
  }
}

export class SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string

  constructor(english_name: string, iso_639_1: string, name: string) {
    this.english_name = english_name;
    this.iso_639_1 = iso_639_1;
    this.name = name;
  }
}
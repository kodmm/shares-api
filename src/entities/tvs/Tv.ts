export interface IDetail {
    backdrop_path: string;
    // backdrop_path: string | null;
    created_by: ICreatedBy[];
    episode_run_time: number[];
    first_air_date: string;
    genres: IGenre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: ILastEpisodeToAir;
    name: string;
    next_episode_to_air: null;
    networks: INetwork[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: IProductionCompany[];
    production_countries: IProductionCountry[];
    seasons: ISeason[];
    spoken_languages: ISpokenLanguage;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    videos: IVideo;
    images: IImage;
}

export interface ICreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
    // profile_path: string | null;

}

export interface IGenre {
    id: number;
    name: string;

}

export interface ILastEpisodeToAir {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    // still_path: string | null;
    vote_average: number;
    vote_count: number;
}

export interface INetwork {
    name: string;
    id: number;
    logo_path: string;
    // logo_path: string | null;
    origin_country: string;

}

export interface IProductionCompany {
    id: number;
    logo_path: string | null;
    // logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface IProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface ISeason {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

export interface ISpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface IVideo {
    results: any[];
}

export interface IImage {
    backdrops: string[];
    logos: string[];
    posters: string[];
}

export interface ICast {
    adult: boolean;
    gender: number;
    // gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    // profile_path: string | null;
    character: string;
    credit_id: string;
    order: number;
}

export interface ICrew {
    adult: boolean;
    gender: number;
    // gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    // profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
}

export interface ICredit {
    cast: ICast[];
    crew: ICrew[];
    id: number;
}

export interface ITvTranslation {
    id: number;
    translations: ITranslation[];
}

export interface ITranslation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: ITranslationData;
}

export interface ITranslationData {
    name: string;
    overview: string;
    homepage: string;
}
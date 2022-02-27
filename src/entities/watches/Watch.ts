export const genreNameKeys = {
    TV: 'TV',
    MOVIE: 'MOVIE',
} as const 

type genreNameKeys = typeof genreNameKeys[keyof typeof genreNameKeys]

export interface IWatch {
    id: number,
    user_id: string,
    video_id: number,
    isWatch: boolean,
    genreName: genreNameKeys,
    createdAt: string,
    updatedAt: string,
}

export interface IVideo {
    id: number,
    name: string,
    poster_path: string,
    overview: string,
    createdAt: string,
    updatedAt: string,
}

export interface IActor {
    id: number,
    name: string,
    profile_path: string,
    createdAt: string,
    updatedAt: string,
}

export interface IActorVideos {
    id: number,
    video_id: number,
    actor_id: number,
    createdAt: string,
    updatedAt: string,
}
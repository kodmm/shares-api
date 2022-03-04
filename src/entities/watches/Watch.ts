import { IStreamingServiceData } from '@entities/tvs/Tv';

export const genreNameKeys = {
    TV: 'TV',
    MOVIE: 'MOVIE',
} as const 

type genreNameKeys = typeof genreNameKeys[keyof typeof genreNameKeys]

export interface ITimeStamp {
    createdAt: string,
    updatedAt: string,
}

export interface IReferenceKeys {
    user_id: string,
    video_id: number,
}

export interface IWatchData extends ITimeStamp {
    id: number,
    isWatch: boolean,
    genreName: genreNameKeys,
}

export interface IWatch extends IReferenceKeys, ITimeStamp{
    id: number,
    isWatch: boolean,
    genreName: genreNameKeys,
    
}
export interface IVideo extends ITimeStamp {
    id: number,
    name: string,
    poster_path: string,
    overview: string,
}
export interface IActor extends ITimeStamp {
    id: number,
    name: string,
    profile_path: string,
    
}
export interface IActorVideos extends ITimeStamp {
    id: number,
    video_id: number,
    actor_id: number,
}


export interface IWatchActorsVideos {
    id: number,
    isWatch: boolean,
    genreName: genreNameKeys,
    createdAt: string,
    updatedAt: string,
    Video: IVideoActors,
}

export interface IVideoStreaming extends IVideo {
    streaming: IStreamingServiceData,
}
export interface IVideoActors extends IVideoStreaming {
    Actors: Array<{id: number, name: string, profile_path: string}>
}
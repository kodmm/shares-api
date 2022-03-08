import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from 'express';
import axios from "axios";
import logger from "@shared/Logger";
import type { IDetail, ICredit, ITvTranslation, ITranslation, IStreamingService, IStreamingServiceData } from "@entities/tvs/Tv";
import { IUser } from "@entities/users/User";
import { findIsWatch } from './Watch';
// import Tv from '@entities/searches/Tv';
/**
 * Get any tv
 * @param req
 * @param res
 * @param String
 * @returns
 */

export const getAnyTv = async(req: Request, res: Response) => {
    const query = await req.query.query as string | undefined;
    // baseUrl
    const baseImgUrl: string = "https://image.tmdb.org/t/p";
    const imgWidth: string = "/w500";

    // 1. SearchでTvIDを取得
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&language=ja-JP&query=${query}`;
    const enUrl = encodeURI(url);
    const resSearchTv: any = await axios.get(enUrl)
                                .then(response => response.data);
    
    return res.json({ data: {resSearchTv, baseImgUrl: baseImgUrl + imgWidth} });
}

/**
 * 
 * @param req 
 * @param res 
 * @returns
 */
export const getTvDetail = async(req: Request, res: Response) => {
    const user: IUser | null = res.locals.authUser

    const id = req.params.id;
    //baseUrl
    const baseUrl: string = "https://image.tmdb.org/t/p";
    const imgWidth: string = "/w500";

    let resDetail!: IDetail;
    let resOverviews: any;

    //Tvの詳細データを取得
    resDetail = await getDetails(id)

    // 番組名と概要を日本語に変換
    resDetail = await getTransInfo(resDetail, id)

    // creditsを使用して出演者を取得
    const resCredits: ICredit = await getCredits(id)

    return res.json({ data: { resDetail, credits: resCredits, baseUrl: baseUrl + imgWidth } });
}

export const getTvStreamingUserIsWatch = async(req: Request, res: Response, next: NextFunction) => {
    const user: IUser = res.locals.authUser
    const id: number = Number(req.params.id)
    // 配信サービスを取得
    const resStreaming: IStreamingServiceData = await getStreamingServices(id)

    // Watchリストに入っているか否か
    const userIsWatch: boolean | null = user? await findIsWatch(user.id, id): null

    res.json({ data: { streaming: resStreaming, isWatch: userIsWatch }})
}

// Get Translations, name, overview
const getTransInfo = async(tvDetail: IDetail, id: string) => {
    const url: string = `https://api.themoviedb.org/3/tv/${id}/translations?api_key=${process.env.TMDB_API_KEY}`
    const isoCodeJP: string = "JP";
    let translation!: ITvTranslation;
    await axios.get(url)
        .then(response => translation = response.data)

    const translationJa: ITranslation[] = translation.translations.filter(translation => translation.iso_3166_1 == isoCodeJP)
    if (translationJa.length > 0) {
        tvDetail.name = translationJa[0].data.name
        tvDetail.overview = translationJa[0].data.overview
        return tvDetail
    }
    return tvDetail
}

// get streaming services
export const getStreamingServices = async(id: number) => {
    const url: string = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
    const data: IStreamingService = await axios.get(url)
        .then(response => response.data)
    const dataJP: IStreamingServiceData = data.results.JP
    
    return dataJP
}

// get tv details
const getDetails = async(id: string) => {
    let resDetail!: IDetail;
    const url: string = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images`;
    await axios.get(url)
        .then(response => resDetail = response.data);
    return resDetail
}

// get credits
const getCredits = async(id: string) => {
    let resCredits!: ICredit;
    const urlCrd: string = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`;
    await axios.get(urlCrd)
        .then(response => resCredits = response.data)
    return resCredits
}

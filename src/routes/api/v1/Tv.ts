import { StatusCodes } from "http-status-codes";
import { Request, Response } from 'express';
import axios from "axios";
import logger from "@shared/Logger";
import { IDetail, ICredit, ITvTranslation, ITranslation, IStreamingService, IStreamingServiceData } from "@entities/tvs/Tv";
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

    let resSearchTv, data;
    // 1. SearchでTvIDを取得
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&language=ja-JP&query=${query}`;
    const enUrl = encodeURI(url);
    await axios.get(enUrl)
        .then(response => resSearchTv = response.data);
    console.log(resSearchTv);

    // // 2.provider
    // data = getStream(resSearchTv.results)
    
    return res.json({ data: {resSearchTv, baseImgUrl: baseImgUrl + imgWidth} });
}

/**
 * 
 * @param req 
 * @param res 
 * @returns
 */
export const getTvDetail = async(req: Request, res: Response) => {
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

    // 配信サービスを取得
    const resStreaming: IStreamingServiceData = await getStreamingServices(id)

    return res.json({ data: { resDetail, credits: resCredits, streaming: resStreaming, baseUrl: baseUrl + imgWidth } });
}

/*
const getStream = async (searchResults: any) => {
    
    let resStream: any;
    const isoCode: string = "JP";
    const data: any = await searchResults.map(searchResult => {
        const id = searchResult.id 
        const url = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
        axios.get(url)
                .then(response => resStream = response.data);
        console.log(resStream.isoCode);
        searchResult.stream = searchResult.isoCode
        return searchResult
    })
    return data;
}
*/

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
const getStreamingServices = async(id: string) => {
    const url: string = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
    let data!: IStreamingService;
    let dataJP: IStreamingServiceData;
    await axios.get(url)
        .then(response => data = response.data)
    dataJP = data.results.JP
    
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
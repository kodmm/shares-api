import { StatusCodes } from "http-status-codes";
import { Request, Response } from 'express';
import axios from "axios";
import logger from "@shared/Logger";
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
    const baseUrl: string = "https://image.tmdb.org/t/p";
    const imgWidth: string = "/w500";

    let resSearchTv: any;
    // 1. SearchでTvIDを取得
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&language=jp-JP&query=${query}`;
    const enUrl = encodeURI(url);
    await axios.get(enUrl)
        .then(response => resSearchTv = response.data);
    console.log(resSearchTv);
    return res.json({ resSearchTv, baseUrl: baseUrl + imgWidth});
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

    let resDetail, resCredits, data: any = null;
    let resOverviews: any;

    //Tvの詳細データを取得
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images`;
    await axios.get(url)
        .then(response => resDetail = response.data);
    
    data = resDetail;

    // translationsを使用してoverviewsを日本語化する
    const urlTrsn = `https://api.themoviedb.org/3/tv/${id}/translations?api_key=${process.env.TMDB_API_KEY}`;
    await axios.get(urlTrsn)
        .then(response => resOverviews = response.data);
    
    data.overview = await overviewTrans(resOverviews.translations)

    // creditsを使用して出演者を取得
    const urlCrd = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=jp-JP`;
    await axios.get(urlCrd)
        .then(response => resCredits = response.data)
    console.log(resCredits);
    return res.json({ data, credits: resCredits, baseUrl: baseUrl + imgWidth });
}


/**
 * 
 * @param translations 
 * @returns 
 */
const overviewTrans = async(translations: Array<any>) => {
    const isoCode = "JP";
    const result: any = await translations.filter(translation => translation.iso_3166_1 === isoCode)
    console.log(result[0].data.overview);
    if (result.length < 0) {
        return translations[0].data.overview;
    }
    return result[0].data.overview;
}
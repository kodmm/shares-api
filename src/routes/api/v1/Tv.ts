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

    let resDetail, resCredits, data: any = null;
    let resOverviews: any;

    //Tvの詳細データを取得
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP&append_to_response=videos,images`;
    await axios.get(url)
        .then(response => resDetail = response.data);
    

    // creditsを使用して出演者を取得
    const urlCrd = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`;
    await axios.get(urlCrd)
        .then(response => resCredits = response.data)
    console.log(resCredits);
    return res.json({ data: { data, credits: resCredits, baseUrl: baseUrl + imgWidth } });
}


// const getStream = async (searchResults: any) => {
    
//     let resStream: any;
//     const isoCode: string = "JP";
//     const data: any = await searchResults.map(searchResult => {
//         const id = searchResult.id 
//         const url = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
//         axios.get(url)
//                 .then(response => resStream = response.data);
//         console.log(resStream.isoCode);
//         searchResult.stream = searchResult.isoCode
//         return searchResult
//     })
//     return data;
// }


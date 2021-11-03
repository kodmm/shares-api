import { StatusCodes } from "http-status-codes";
import { Request, Response } from 'express';


/**
 * Get any tv
 * @param req
 * @param res
 * @param String
 * @returns
 */

export async function getAnyTvs(req: Request, res: Response, query: String) {
    // 1. SearchでTvIDを取得
    // 2. 1.で取得したIDを使用してTvのGetDetailsを取得
    // 3. translationsを使用してoverviewsを日本語化する 
    // 4. creditsを使用して出演者を取得
}
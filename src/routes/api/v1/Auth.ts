import { NextFunction, Request, Response } from 'express';

import passport from '../../../auth/passportTwitterSSO';


/**
 * 
 * @param req 
 * @param res 
 */
export const authLogin = async(req: Request, res: Response) => {
    await passport.authenticate('twitter')
}

/**
 * 
 * @param req 
 * @param res 
 */
export const authCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('twitter', {
        failureRedirect: 'http://localhost:3000/login',
        session: false,
    }), (req: Request, res: Response) => {
        console.log("-------")
        console.log(req.user)
        console.log("--------------")
        // accesstokenのセット
        res.cookie('token', req.user, {
            httpOnly: true,
        })
        // redirect
        res.redirect('http://localhost:3000/mypage')
    }
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log("req.session", req.session)
    console.log("req.cookie", req.cookies)
    res.json({ data: "data"})
}

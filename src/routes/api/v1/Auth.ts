import { Request, Response } from 'express';
import passport from 'passport';


/**
 * 
 * @param req 
 * @param res 
 */
export const authLogin = async(req: Request, res: Response) => {
    passport.authenticate('twitter')
}

/**
 * 
 * @param req 
 * @param res 
 */
export const authCallback = async(req: Request, res: Response) => {
    passport.authenticate('twitter', {
        failureRedirect: 'http://localhost:3000/login',
        session: false,
    }), (req: Request, res: any) => {
        // accesstokenのセット
        res.cookie('token', res.user.token, {
            httpOnly: true,
        })
        // redirect
        res.redirect('http://localhost:3000/mypage')
    } 
}
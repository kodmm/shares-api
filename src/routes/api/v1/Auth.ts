import { NextFunction, Request, Response } from 'express';
import passport from '../../../auth/passportSSO';

// @ts-ignore
import db from '../../../../models';
import { IUser } from '@entities/users/User';


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const isAuth = async(req: Request, res: Response, next: NextFunction) => {
    const userId: string | undefined = req.cookies.id? req.cookies.id : req.query.id

    if (userId) {
        const user: IUser | null = await findUser(userId)

        res.locals.authUser  = user
    } else {
        res.locals.authUser = null
    }

    next()
}

export const getUser = async(req: Request, res: Response) => {
    const userId: string | undefined = req.cookies.id? req.cookies.id : undefined
    const user: IUser | null = userId? await findUser(userId): null
    res.json({ data: {user: user}})
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('id')
    res.json({ data: { isAuth: false }})
}

const findUser = async(id: string) => {
    const user: any = await db.User.findByPk(id)
    return user.toJSON()
}
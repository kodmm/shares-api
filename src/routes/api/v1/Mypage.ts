import { StatusCodes } from "http-status-codes";
import type { Request, Response } from 'express';

// @ts-ignore
import db from '../../../../models'

export const getMyData = async(req: Request, res: Response) => {
    const authUser: any = res.locals.authUser

    return res.json({ data: { user: authUser  } })
}

const findByPkUser = async (id: string) => {
    const user: object = await db.User.findByPk(id);
    return user
}

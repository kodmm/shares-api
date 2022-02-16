import { StatusCodes } from "http-status-codes";
import type { Request, Response } from 'express';

// @ts-ignore
import db from '../../../../models'

export const getMyData = async(req: Request, res: Response) => {
    const query: any = req.query;
    const id: string = query.id;


    const user: object = await findByPkUser(id)
    

    return res.json({ data: user })
}

const findByPkUser = async (id: string) => {
    const user: object = await db.User.findByPk(id);
    return user
}

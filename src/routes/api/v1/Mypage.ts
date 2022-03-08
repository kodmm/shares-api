import { StatusCodes } from "http-status-codes";
import type { Request, Response } from 'express';
import { IUser } from '@entities/users/User';
import { IStreamingServiceData } from '@entities/tvs/Tv'
import { IWatchActorsVideos } from '@entities/watches/Watch'
import { findWatchesVideosActors } from './Watch';
import { getStreamingServices } from './Tv';
// @ts-ignore
import db from '../../../../models'

export const getMyData = async(req: Request, res: Response) => {
    const authUser: IUser | null = res.locals.authUser
    if (authUser) {
        const watches: { Watches: IWatchActorsVideos[] }| null = await findWatchesVideosActors(authUser.id);
        if(watches !== null) {
            const resWatches: IWatchActorsVideos[] = await Promise.all(watches.Watches.map(async(watch) => {
                const streaming: IStreamingServiceData = await getStreamingServices(watch.Video.id)
                watch.Video.streaming = streaming
                return watch
            }))
            return res.json({ data: { user: authUser, watches: resWatches } })
        }
        return res.json({ data: { user: authUser, watches: null } })
    }
    return res.json({ data: { user: null  } })
}

const findByPkUser = async (id: string) => {
    const user: any = await db.User.findByPk(id);
    return user.toJSON()
}

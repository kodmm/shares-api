import { StatusCodes } from "http-status-codes";
import type { Request, Response } from 'express';
import axios from 'axios';
import { IWatch, IVideo, IActor } from "@entities/watches/Watch";
// @ts-ignore
import db from '../../../../models';
import { Op } from 'sequelize';

// get watches
export const getWatches = async(req: Request, res: Response) => {
    console.log(res.locals.authUser.id)
    const userId: string = "bc6ad056-d2c8-4a5f-a226-1ddfc3bd813b"
    const watches: any = await findWatches(userId);
}
// destroy watch
export const destroyWatch = async(req: Request, res: Response) => {
    const user: any = res.locals.authUser
    const id: number = Number(req.params.id)
    const watch: IWatch | null = await deleteWatch(user.id, id)
}

export const getVideoIds = async(userId: string) => {
    const videoIds: any = await db.User.findByPk(userId, {
        include: [{
            model: db.Video,
            attributes: ['id'],
            through: {
                attributes: [],
            },
        }],
        
        attributes: [],
    }) 

    return videoIds.Videos;
}

export const findIsWatch = async(userId: string, videoId: number) => {
    const watch: IWatch = await db.Watch.findOne({
        where: {
            [Op.and]: [{ user_id: userId}, { video_id: videoId }],
        }
    })
    
    const isWatch: boolean = watch? true : false

    return isWatch
}

const findWatches = async (userId: string) => {
    const userWatchVideosActor: any = await db.User.findByPk(userId, {
        include: [{
            model: db.Video,
            include: [{
                model: db.Actor,
                through: {
                    attributes: [],
                },
            }],
            through: {
                attributes: ['id', 'isWatch', 'genreName', 'createdAt', 'updatedAt']
            },
        }],
        attributes: [],
    });

    return userWatchVideosActor

}

// post watches (& actor, video, actorVideo)
export const postWatch = async(req: Request, res: Response) => {
    const userId: string = req.cookies.id
    const reqData: { "watch": IWatch, "video": IVideo, "actors": IActor[] } = req.body
    const { watch, video, actors } = reqData;

    let isSuccess: boolean = false;

    const authUser = await findUser(userId)
    if (authUser) {
        // video
        const videoCreated: IVideo = await createVideo(video);

        // actor
        const actorsCreated: IActor[] = await Promise.all(actors.map(async(actor) => {
            const actorCreated: IActor = await createActor(actor)
            return actorCreated
        }))

        // actorVideos
        actorsCreated.map(actorCreated => {
            createActorVideos(actorCreated.id, videoCreated.id)

        })

        // watch
        const watchCreated: IWatch = await createWatch(watch, userId, videoCreated.id)

        isSuccess = !isSuccess
    }
    
    return res.json({ data: { isSuccess: isSuccess } })

}


const findUser = async(id: string) => {
    const user: any = await db.User.findByPk(id)
    return user
}

const createWatch = async(data: IWatch, userId: string, videoId: number) => {
    const watch: any = await db.Watch.build({...data, user_id: userId, video_id: videoId});
    watch.save();

    return watch
}
const deleteWatch = async(userId: string, videoId: number) => {
    const delWatch: IWatch = await db.Watch.destroy({
        where: {
            [Op.and]: [{user_id: userId, video_id: videoId}]
        }
    })
    return delWatch
}

const createVideo = async (data: IVideo) => {
    let video = await db.Video.findByPk(data.id)
    if (video === null) {
        video = await db.Video.create(data)
    }
    return video
}

const createActorVideos = async(actor_id: number, video_id: number) => {
    let actorVideo = await db.ActorVideo.findOne({
        where: {
            [Op.and]: [{ actor_id: actor_id}, { video_id: video_id }],
        }
    })
    if (actorVideo === null) {
        actorVideo = await db.ActorVideo.create({ actor_id: actor_id, video_id: video_id})
    }

    return actorVideo

}

const createActor = async(data: IActor) => {
    let actor = await db.Actor.findByPk(data.id)
    if (actor === null) {
        actor = await db.Actor.create(data)
    }
    return actor
}


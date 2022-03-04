import { StatusCodes } from "http-status-codes";
import type { Request, Response } from 'express';
import axios from 'axios';
import { IWatch, IVideo, IActor, IWatchData } from "@entities/watches/Watch";
// @ts-ignore
import db from '../../../../models';
import { Op } from 'sequelize';
import { IUser } from "@entities/users/User";

// get watches
export const getWatches = async(req: Request, res: Response) => {
    const userId: string = res.locals.authUser.id
    const watches: any = await findWatches(userId);
    res.json({ data: { watches: watches }})
}
// destroy watch
export const destroyWatch = async(req: Request, res: Response) => {
    const user: IUser | null = res.locals.authUser
    const id: number = Number(req.params.id)
    
    const watch: number | null = user? await deleteWatch(id) : null
    res.json({ data: { watch: watch }})
}

export const updateWatch = async(req: Request, res: Response) => {
    const user: IUser | null = res.locals.authUser
    const reqData: { isWatch: boolean } = req.body
    const watchId: number = Number(req.params.id)
    const watch: IWatchData = await patchWatch( watchId, reqData)
    watch.id = watchId

    res.json({ data: {watch: watch} })
}
export const patchWatch = async(id: number, data: { isWatch: boolean }) => {
    const watch: Array<any> = await db.Watch.update(data, {
        where: {
            id: id,
        },
        returning: true,
        plain: true,
    })
    return watch[1].toJSON()
    
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

export const findWatches = async (userId: string) => {
    const userWatchVideosActor: any = await db.User.findByPk(userId, {
        include: [{
            model: db.Video,
            include: [{
                model: db.Actor,
                through: {
                    attributes: [],
                },
                attributes: ['id', 'name', 'profile_path'],
            }],
            through: {
                attributes: ['id', 'isWatch', 'genreName', 'createdAt', 'updatedAt'],
            },
        }],
    });

    return userWatchVideosActor.toJSON()

}

export const findWatchesVideosActors = async(userId: string) => {
    const data: any = await db.User.findByPk(userId, {
        include: [{
            model: db.Watch,
            include: [{
                model: db.Video,
                include: [{
                    model: db.Actor,
                    throught: {
                        attributes: [],
                    },
                    attributes: ['id', 'name', 'profile_path'],
                }]
            }],
            attributes: ['id', 'user_id', 'isWatch', 'video_id', 'genreName', 'createdAt', 'updatedAt']
        }],
        attributes: [],

    })
    return data.toJSON();
}

// post watches (& actor, video, actorVideo)
export const postWatch = async(req: Request, res: Response) => {
    const authUser: IUser | null = res.locals.authUser
    const reqData: { "watch": IWatch, "video": IVideo, "actors": IActor[] } = req.body
    const { watch, video, actors } = reqData;

    let isSuccess: boolean = false;

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
        const watchCreated: IWatch = await createWatch(watch, authUser.id, videoCreated.id)

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

    return watch.toJSON()
}
const deleteWatch = async(id: number) => {
    const delWatch: number = await db.Watch.destroy({
        where: {
            id: id,
        },
    })
    return delWatch
}

const createVideo = async (data: IVideo) => {
    let video = await db.Video.findByPk(data.id)
    if (video === null) {
        video = await db.Video.create(data)
    }
    return video.toJSON()
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

    return actorVideo.toJSON()

}

const createActor = async(data: IActor) => {
    let actor = await db.Actor.findByPk(data.id)
    if (actor === null) {
        actor = await db.Actor.create(data)
    }
    return actor.toJSON()
}


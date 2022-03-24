import { IChatData, IChat, IChatUser } from '@entities/chats/Chat';
// @ts-ignore
import db from '../../../../models/index';

export const addChat = async (data: IChatData):Promise<any> => {
const chat = (({ user_id, video_id, ...chatData}) => chatData)((await createChat(data)).toJSON());
return chat
}

const createChat = async(data: IChatData):Promise<any> => {
    const chat: any = await db.Chat.create(data)
    return chat
}

export const findTvChats = async(videoId: number):Promise<IChatUser[] | null > => {
    const chats: any = await db.Chat.findAll({
        where: { video_id: videoId },
        include: [{
            model: db.User,
            attributes: ['id', 'displayName', 'photo'],
        }],
        attributes: ['id', 'messageType', 'message', 'createdAt', 'updatedAt'],
    })

    return chats !== null? chats: []
}
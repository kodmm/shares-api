const messageTypeKeys = {
    TEXT: 'text',
} as const 
type messageTypeKeys = typeof messageTypeKeys[keyof typeof messageTypeKeys]


interface ITimestamp {
    createdAt: string,
    updatedAt: string,
}

interface IReferenceKeys {
    user_id: string,
    video_id: number,
}

interface IMessage {
    messageType: messageTypeKeys,
    message: string,
}

export interface IChat extends IMessage, ITimestamp {
    id: number,
} 

export interface IChatData extends IReferenceKeys, IMessage {}

export interface IUser {
    id: string,
    displayName: string,
    photo: string,
}

export interface IChatUser extends IChat {
    User: IUser,
}
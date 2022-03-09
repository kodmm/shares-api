interface ITimestamp {
    createdAt: string,
    updatedAt: string,
}

interface IReferenceKeys {
    user_id: string,
    video_id: number,
}

const messageTypeKeys = {
    MESSAGE: 'message',
} as const 
type messageTypeKeys = typeof messageTypeKeys[keyof typeof messageTypeKeys]

interface IChatData {
    id: number,
    messageType: messageTypeKeys,
    message: string,
}

interface IChat extends IChatData, IReferenceKeys, ITimestamp {} 
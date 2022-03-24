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

interface IChat extends IChatData, IReferenceKeys, ITimestamp {} 
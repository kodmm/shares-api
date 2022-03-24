export const providerNameKeys = {
    TWITTER: 'twitter',
    GOOGLE: 'google',
} as const

type providerNameKeys = typeof providerNameKeys[keyof typeof providerNameKeys]

interface ITimeStamp {
    createdAt: string,
    updatedAt: string,
}

export interface IUser extends ITimeStamp {
    id: string,
    accessToken: string,
    refreshToken: string,
    displayName: string,
    email: string,
    photo: string,
    provider: providerNameKeys,
}

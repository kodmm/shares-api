export const providerNameKeys = {
    TWITTER: 'twitter',
    GOOGLE: 'google',
} as const

type providerNameKeys = typeof providerNameKeys[keyof typeof providerNameKeys]

export interface IUser {
    id: string,
    accessToken: string,
    refreshToken: string,
    displayName: string,
    email: string,
    photo: string,
    provider: providerNameKeys,
    createdAt: string,
    updatedAt: string,
}
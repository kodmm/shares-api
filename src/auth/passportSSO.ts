import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import GoogleStrategy from 'passport-google-oauth20';
// @ts-ignore
import db from '../../models/index.js'

// @ts-ignore
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: 'http://localhost:3001/api/v1/auth/twitter/callback',
    includeEmail: true
},async (token: any, tokenSecret: any, profile: any, done: any) => {
    // dbへ登録処理(find or create)

    const [user, created] = await findOrCreateUser(profile, token)

    done(null, user.id)

}
))

// @ts-ignore
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/v1/auth/google/callback'
},async (token: any, tokenSecret: any, profile: any, done: any) => {
    // dbへ登録処理(find or create)
    const [user, created] = await findOrCreateUser(profile, token)
    done(null, user.id)
}))


const findOrCreateUser = async(profile: any, token: string) => {
    const [user, created] = await db.User.findOrCreate({
        where: {email: profile.emails[0].value},
        defaults: { 
            displayName: profile.displayName, 
            email: profile.emails[0].value, 
            photo: profile.photos[0].value,
            provider: profile.provider,
            accessToken: token,
        },
    })

    return [user, created]

}

export default passport;
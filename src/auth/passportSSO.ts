import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import GoogleStrategy from 'passport-google-oauth20';
// @ts-ignore
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: 'http://localhost:3001/api/v1/auth/twitter/callback',
    includeEmail: true
},(token: any, tokenSecret: any, profile: any, done: any) => {
    console.log("function callback")
    // dbへ登録処理(find or create)
    console.log("token:", token)
    console.log("tokenSecret:", tokenSecret)
    console.log("profile:", profile)
    done(null, token)

}
))

// @ts-ignore
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/v1/auth/google/callback'
},(token: any, tokenSecret: any, profile: any, done: any) => {
    console.log("function callback")
    // dbへ登録処理(find or create)
    console.log("token:", token)
    console.log("tokenSecret:", tokenSecret)
    console.log("profile:", profile)
    done(null, token)
}))

export default passport;
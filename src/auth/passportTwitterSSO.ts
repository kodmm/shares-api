import passport from 'passport';
import TwitterStrategy from 'passport-twitter';

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    // callbackURL: 'http://localhost:3000/mypage',
    callbackURL: 'http://localhost:3001/auth/twiter/callback'

},(token: any, tokenSecret: any, profile: any, done: any) => {
    // dbへ登録処理(find or create)
    done(null, token)

}
))
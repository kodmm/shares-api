import { Router } from 'express';
import { Request, Response } from 'express';

import { getAnyTv, getTvDetail } from './Tv';
import passport from '../../../auth/passportTwitterSSO';


// Auth-route
const authRouter: Router = Router();
authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: 'http://localhost:3000/login',
    session: false,
}), (req: Request, res: Response) => {
    console.log("-------")
    console.log(req.user)
    console.log("--------------")
    // accesstokenのセット
    res.cookie('token', req.user, {
        httpOnly: true,
    })
    // redirect
    res.redirect('http://localhost:3000/mypage')
});

// Tv-route
const tvRouter: Router = Router();
tvRouter.get('/search', getAnyTv);
tvRouter.get('/:id', getTvDetail);
// tvRouter.get('/:id/:roomId',)



// Export the base-router
const baseRouter = Router();
baseRouter.use('/tv', tvRouter);
baseRouter.use('/auth',authRouter);
export default baseRouter

import { Router } from 'express';
import type { Request, Response } from 'express';

import { getAnyTv, getTvDetail } from './Tv';
import { getMyData } from './Mypage';
import passport from '../../../auth/passportSSO';
import { isAuth, logout } from './Auth';

// Auth-route
const authRouter: Router = Router();
authRouter.get('/', isAuth);
authRouter.delete('/logout', logout);
authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: 'http://localhost:3000/login',
    session: false,
}), (req: Request, res: Response) => {
    // accesstokenのセット
    res.cookie('id', req.user, {
        httpOnly: true,
    })
    // redirect
    res.redirect('http://localhost:3000/mypage')
});
authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
authRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
    session: false,
}),(req: Request, res: Response) => {
    // accesstokenのセット
    res.cookie('id', req.user, {
        httpOnly: true,
    })
    // redirect
    res.redirect('http://localhost:3000/mypage')
}
)

// Tv-route
const tvRouter: Router = Router();
tvRouter.get('/search', getAnyTv);
tvRouter.get('/:id', getTvDetail);
// tvRouter.get('/:id/:roomId',)

// MyData-route
const myDataRouter: Router = Router();
myDataRouter.get('/', getMyData);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/tv', tvRouter);
baseRouter.use('/auth',authRouter);
baseRouter.use('/mypage', myDataRouter);
export default baseRouter

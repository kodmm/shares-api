import { Router } from 'express';
import type { Request, Response } from 'express';

import { getAnyTv, getTvDetail, getTvStreamingUserIsWatch } from './Tv';
import { getMyData } from './Mypage';
import passport from '../../../auth/passportSSO';
import { isAuth, logout } from './Auth';
import { postWatch, destroyWatch, updateWatch } from './Watch';

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
tvRouter.get('/:id',getTvDetail);
tvRouter.get('/streaming/:id/iswatch',isAuth, getTvStreamingUserIsWatch);

// MyData-route
const myDataRouter: Router = Router();
myDataRouter.get('/', isAuth, getMyData);


const watchRouter: Router = Router();
watchRouter.post('/', isAuth, postWatch);
watchRouter.patch('/:id', isAuth, updateWatch)
watchRouter.delete('/:id', isAuth, destroyWatch);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/tv', tvRouter);
baseRouter.use('/auth',authRouter);
baseRouter.use('/mypage', myDataRouter);
baseRouter.use('/watch', watchRouter);
export default baseRouter

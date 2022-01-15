import { Router } from 'express';
import { getAnyTv, getTvDetail } from './Tv';
import { authLogin, authCallback } from './Auth';





// Tv-route
const tvRouter: Router = Router();
tvRouter.get('/search', getAnyTv);
tvRouter.get('/:id', getTvDetail);
// tvRouter.get('/:id/:roomId',)

// Auth-route
const authRouter: Router = Router();
authRouter.get('/twitter', authLogin);
authRouter.get('/twitter/callback', authCallback);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/tv', tvRouter);
baseRouter.use('/auth',authRouter);
export default baseRouter

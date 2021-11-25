import { Router } from 'express';
import { getAnyTv, getTvDetail } from './Tv';






// Tv-route
const tvRouter = Router();
tvRouter.get('/search', getAnyTv);
tvRouter.get('/:id', getTvDetail);
// tvRouter.get('/:id/:roomId',)
// Export the base-router
const baseRouter = Router();
baseRouter.use('/tv', tvRouter);
export default baseRouter

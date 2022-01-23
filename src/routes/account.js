import { Router } from 'express';
import reviewsRouter from './account.reviews';

const router = Router();

router.use('/reviews', reviewsRouter);

export default router;

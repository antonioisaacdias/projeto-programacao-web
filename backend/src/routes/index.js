import { Router } from 'express';
import movieRoutes from './movie.js';
import actorRoutes from './actor.js';

const router = Router();

router.use('/movies', movieRoutes);
router.use('/actors', actorRoutes);

export default router;
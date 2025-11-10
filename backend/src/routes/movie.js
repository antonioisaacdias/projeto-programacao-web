import { Router } from 'express';
import movieController from '../controllers/movie.js';

const router = Router();

router.post('/', movieController.create);
router.get('/', movieController.getAll);
router.get('/:id', movieController.getById);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.delete);
router.post('/:id/actors', movieController.addActor);
router.delete('/:id/actors', movieController.removeActor);

export default router;
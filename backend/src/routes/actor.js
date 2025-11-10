import { Router } from 'express';
import actorController from '../controllers/actor.js';

const router = Router();

router.post('/', actorController.create);
router.get('/', actorController.getAll);
router.get('/:id', actorController.getById);
router.put('/:id', actorController.update);
router.delete('/:id', actorController.delete);

export default router;
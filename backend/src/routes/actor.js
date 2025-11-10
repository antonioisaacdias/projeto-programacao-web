import { Router } from 'express';
import actorController from '../controllers/actor.js';
import actorValidator from '../middlewares/actor.js';

const router = Router();

router.post('/', actorValidator.validateCreate, actorController.create);
router.get('/', actorValidator.validatePagination, actorController.getAll);
router.get('/:id', actorValidator.validateId, actorController.getById);
router.put('/:id', actorValidator.validateId, actorValidator.validateUpdate, actorController.update);
router.delete('/:id', actorValidator.validateId, actorController.delete);

export default router;
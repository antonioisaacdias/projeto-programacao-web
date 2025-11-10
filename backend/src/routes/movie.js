import { Router } from 'express';
import movieController from '../controllers/movie.js';
import movieValidator from '../middlewares/movie.js';

const router = Router();

router.post('/', movieValidator.validateCreate, movieController.create);
router.get('/', movieValidator.validatePagination, movieController.getAll);
router.get('/:id', movieValidator.validateId, movieController.getById);
router.put('/:id', movieValidator.validateId, movieValidator.validateUpdate, movieController.update);
router.delete('/:id', movieValidator.validateId, movieController.delete);
router.post('/:id/actors', movieValidator.validateId, movieValidator.validateAddActor, movieController.addActor);
router.delete('/:id/actors', movieValidator.validateId, movieValidator.validateAddActor, movieController.removeActor);

export default router;
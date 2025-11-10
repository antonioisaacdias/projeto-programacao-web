import actorService from '../services/actor.js';

class ActorController {
  async create(req, res) {
    try {
      const actor = await actorService.create(req.body);
      return res.status(201).json(actor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      
      const result = await actorService.getAll(page, limit);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const actor = await actorService.getById(req.params.id);
      if (!actor) {
        return res.status(404).json({ error: 'Actor not found' });
      }
      return res.status(200).json(actor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const actor = await actorService.update(req.params.id, req.body);
      return res.status(200).json(actor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await actorService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ActorController();
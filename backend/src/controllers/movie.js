import movieService from '../services/movie.js';

class MovieController {
  async create(req, res) {
    try {
      const movie = await movieService.create(req.body);
      return res.status(201).json(movie);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      
      const result = await movieService.getAll(page, limit);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const movie = await movieService.getById(req.params.id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      return res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const movie = await movieService.update(req.params.id, req.body);
      return res.status(200).json(movie);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await movieService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

    async addActor(req, res) {
        try {
            const { id } = req.params;
            const { actorId } = req.body;
            const movie = await movieService.addActor(id, actorId);
            return res.status(200).json(movie);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async removeActor(req, res) {
        try {
            const { id } = req.params;
            const { actorId } = req.body;
            const movie = await movieService.removeActor(id, actorId);
            return res.status(200).json(movie);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new MovieController();
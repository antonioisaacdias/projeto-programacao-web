class MovieValidator {
  validateCreate(req, res, next) {
    const { title, releaseYear, genre, ageGroup } = req.body;
    const errors = [];

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push('Title is required and must be a valid string');
    }

    if (!releaseYear || typeof releaseYear !== 'number') {
      errors.push('Release year is required and must be a number');
    } else if (releaseYear < 1888 || releaseYear > new Date().getFullYear() + 5) {
      errors.push('Release year must be between 1888 and ' + (new Date().getFullYear() + 5));
    }

    if (!genre || typeof genre !== 'string' || genre.trim().length === 0) {
      errors.push('Genre is required and must be a valid string');
    }

    if (!ageGroup || typeof ageGroup !== 'number') {
      errors.push('Age group is required and must be a number');
    } else if (ageGroup < 0 || ageGroup > 18) {
      errors.push('Age group must be between 0 and 18');
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  }

  validateUpdate(req, res, next) {
    const { title, releaseYear, genre, ageGroup } = req.body;
    const errors = [];

    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      errors.push('Title must be a valid string');
    }

    if (releaseYear !== undefined) {
      if (typeof releaseYear !== 'number') {
        errors.push('Release year must be a number');
      } else if (releaseYear < 1888 || releaseYear > new Date().getFullYear() + 5) {
        errors.push('Release year must be between 1888 and ' + (new Date().getFullYear() + 5));
      }
    }

    if (genre !== undefined && (typeof genre !== 'string' || genre.trim().length === 0)) {
      errors.push('Genre must be a valid string');
    }

    if (ageGroup !== undefined) {
      if (typeof ageGroup !== 'number') {
        errors.push('Age group must be a number');
      } else if (ageGroup < 0 || ageGroup > 18) {
        errors.push('Age group must be between 0 and 18');
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  }

  validateId(req, res, next) {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    next();
  }

  validateAddActor(req, res, next) {
    const { actorId } = req.body;

    if (!actorId || isNaN(parseInt(actorId))) {
      return res.status(400).json({ error: 'Invalid actor ID' });
    }

    next();
  }

  validatePagination(req, res, next) {
    const { page, limit } = req.query;

    if (page && (isNaN(parseInt(page)) || parseInt(page) < 1)) {
      return res.status(400).json({ error: 'Page must be a positive number' });
    }

    if (limit && (isNaN(parseInt(limit)) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
      return res.status(400).json({ error: 'Limit must be between 1 and 100' });
    }

    next();
  }
}

export default new MovieValidator();
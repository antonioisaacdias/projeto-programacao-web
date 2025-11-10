class ActorValidator {
  validateCreate(req, res, next) {
    const { name, birthdate, gender } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Name is required and must be a valid string');
    }

    if (!birthdate) {
      errors.push('Birthdate is required');
    } else {
      const date = new Date(birthdate);
      if (isNaN(date.getTime())) {
        errors.push('Birthdate must be a valid date');
      } else if (date > new Date()) {
        errors.push('Birthdate cannot be in the future');
      }
    }

    if (!gender || typeof gender !== 'string' || !['M', 'F', 'O'].includes(gender)) {
      errors.push('Gender is required and must be M, F, or O');
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  }

  validateUpdate(req, res, next) {
    const { name, birthdate, gender } = req.body;
    const errors = [];

    if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
      errors.push('Name must be a valid string');
    }

    if (birthdate !== undefined) {
      const date = new Date(birthdate);
      if (isNaN(date.getTime())) {
        errors.push('Birthdate must be a valid date');
      } else if (date > new Date()) {
        errors.push('Birthdate cannot be in the future');
      }
    }

    if (gender !== undefined && (typeof gender !== 'string' || !['M', 'F', 'O'].includes(gender))) {
      errors.push('Gender must be M, F, or O');
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

export default new ActorValidator();
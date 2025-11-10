import { Actor, Movie } from '../models/index.js';

class MovieService {
    async create(data) {
        try {
        const existingMovie = await Movie.findOne({
            where: {
            title: data.title,
            releaseYear: data.releaseYear
            }
        });

        if (existingMovie) {
            throw new Error(`A movie with title "${data.title}" and release year ${data.releaseYear} already exists`);
        }

        const movie = await Movie.create(data);
        return movie;
        } catch (error) {
        throw new Error('Error creating movie: ' + error.message);
        }
    }

    async getAll(page = 1, limit = 10) {
        try {
        const offset = (page - 1) * limit;
        
        const { count, rows } = await Movie.findAndCountAll({
            include: [{
                model: Actor,
                as: 'actors',
                through: { attributes: [] }
            }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            distinct: true
        });
        
        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            movies: rows
        };
        } catch (error) {
        throw new Error('Error fetching movies: ' + error.message);
        }
    }

    async getById(id) {
        try {
        const movie = await Movie.findByPk(id, {
            include: [{
                model: Actor,
                as: 'actors',
                through: { attributes: [] }
            }],
        });
        return movie;
        } catch (error) {
        throw new Error('Error fetching movie: ' + error.message);
        }
    }

    async update(id, data) {
        try {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            throw new Error('Movie not found');
        }

        if (data.title || data.releaseYear) {
            const titleToCheck = data.title || movie.title;
            const yearToCheck = data.releaseYear || movie.releaseYear;

            const existingMovie = await Movie.findOne({
            where: {
                title: titleToCheck,
                releaseYear: yearToCheck
            }
            });

            if (existingMovie && existingMovie.id !== movie.id) {
            throw new Error(`A movie with title "${titleToCheck}" and release year ${yearToCheck} already exists`);
            }
        }

        await movie.update(data);
        return movie;
        } catch (error) {
        throw new Error('Error updating movie: ' + error.message);
        }
    }
    
    async delete(id) {
        try {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            throw new Error('Movie not found');
        }
        await movie.destroy();
        return true;
        } catch (error) {
        throw new Error('Error deleting movie: ' + error.message);
        }
    }

    async addActor(movieId, actorId) {
        try {
        const movie = await Movie.findByPk(movieId);
        const actor = await Actor.findByPk(actorId);
        if (!movie || !actor) {
            throw new Error('Movie or Actor not found');
        }

        const actors = await movie.getActors({ where: { id: actorId } });
        if (actors.length > 0) {
            throw new Error('Actor is already associated with this movie');
        }

        await movie.addActor(actor);
        return await this.getById(movieId);
        } catch (error) {
        throw new Error('Error adding actor to movie: ' + error.message);
        }
    }

    async removeActor(movieId, actorId) {
        try {
        const movie = await Movie.findByPk(movieId);
        const actor = await Actor.findByPk(actorId);
        if (!movie || !actor) {
            throw new Error('Movie or Actor not found');
        }

        const actors = await movie.getActors({ where: { id: actorId } });
        if (actors.length === 0) {
            throw new Error('Actor is not associated with this movie');
        }

        await movie.removeActor(actor);
        return await this.getById(movieId);
        } catch (error) {
        throw new Error('Error removing actor from movie: ' + error.message);
        }
    }
}

const movieService = new MovieService();
export default movieService;
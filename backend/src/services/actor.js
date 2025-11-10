import { Actor, Movie } from '../models/index.js';

class ActorService {
    async create(data) {
        try {
        const actor = await Actor.create(data);
        return actor;
        } catch (error) {
        throw new Error('Error creating actor: ' + error.message);
        }
    }

    async getAll(page = 1, limit = 10) {
        try {
        const offset = (page - 1) * limit;
        
        const { count, rows } = await Actor.findAndCountAll({
            include: [{
                model: Movie,
                as: 'movies',
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
            actors: rows
        };
        } catch (error) {
        throw new Error('Error fetching actors: ' + error.message);
        }
    }

    async getById(id) {
        try {
        const actor = await Actor.findByPk(id, {
            include: [{
                model: Movie,
                as: 'movies',
                through: { attributes: [] }
            }],
        });
        return actor;
        } catch (error) {
        throw new Error('Error fetching actor: ' + error.message);
        }
    }

    async update(id, data) {
        try {
        const actor = await Actor.findByPk(id);
        if (!actor) {
            throw new Error('Actor not found');
        }
        await actor.update(data);
        return actor;
        } catch (error) {
        throw new Error('Error updating actor: ' + error.message);
        }
    }
    
    async delete(id) {
        try {
        const actor = await Actor.findByPk(id);
        if (!actor) {
            throw new Error('Actor not found');
        }
        await actor.destroy();
        return true;
        } catch (error) {
        throw new Error('Error deleting actor: ' + error.message);
        }
    }
}

const actorService = new ActorService();
export default actorService;
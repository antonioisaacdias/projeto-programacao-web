import { sequelize } from '../config/database.js';
import Movie from './movie.js';
import Actor from './actor.js';

Movie.belongsToMany(Actor, {
  through: 'MovieActors',
  foreignKey: 'movieId',
  otherKey: 'actorId',
  as: 'actors',
  timestamps: false,
});

Actor.belongsToMany(Movie, {
  through: 'MovieActors',
  foreignKey: 'actorId',
  otherKey: 'movieId',
  as: 'movies',
  timestamps: false,
});

export { sequelize, Movie, Actor };
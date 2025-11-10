import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
    genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ageGroup: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "movies",
  timestamps: false,
});

export default Movie;
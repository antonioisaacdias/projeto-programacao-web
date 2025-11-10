import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Actor = sequelize.define('Actor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('M', 'F', 'O'),
    allowNull: false,
  },
}, {
  tableName: 'actors',
  timestamps: false,
});

export default Actor;
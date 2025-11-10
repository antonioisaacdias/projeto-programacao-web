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
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'actors',
  timestamps: false,
});

export default Actor;
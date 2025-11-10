import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { testConnection } from './config/database.js';
import { sequelize, Movie, Actor } from './models/index.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

(async () => {
  try {
    await testConnection();
    
    // Mudou de force: true para alter: true
    await sequelize.sync({ alter: true });
    
    console.log('All models were synchronized successfully.');
    console.log('Models registered:', sequelize.models);
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', routes);

export default app;
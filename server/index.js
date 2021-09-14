import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/postsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(express.json({limit:"30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))
app.use(cors());
const PORT = process.env.PORT || 5000;
connectDB();

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => console.log(`Server is runinng on port ${PORT}`));

import express from 'express';
import cors    from 'cors';
import dotenv  from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
const port = process.env.PORT || 5000;

app.use('/api', aiRoutes);

app.listen(port, () => console.log('✅ Server on port 5000'));

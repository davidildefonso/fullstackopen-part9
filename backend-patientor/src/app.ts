import express from 'express';
import cors from 'cors';
import patientsRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.json({data: 'hola hackermen!' } );
});

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);


export default app;
/* eslint-disable no-await-in-loop, no-loop-func, no-undef */
import express from 'express';
import cors from 'cors';
import resultsRouter from './routes/results';
import rosterRouter from './routes/roster';

//---------------------------------------------------------------------

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', resultsRouter);
app.use('/api', rosterRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});

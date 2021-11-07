/* eslint-disable no-await-in-loop, no-loop-func, no-undef */
import express from 'express';
import resultsRouter from './routes/results';

const app = express();
const port = 3000;

app.use('/api', resultsRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});

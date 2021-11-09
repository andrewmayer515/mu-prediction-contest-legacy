import express from 'express';

import { ROSTER } from '../../../config/roster';

//---------------------------------------------------------------------

const router = express.Router();

router.get('/roster', async (req, res) => {
  res.json(ROSTER);
});

export default router;

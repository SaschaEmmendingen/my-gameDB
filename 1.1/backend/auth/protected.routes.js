import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Das ist eine geschützte Route. Du bist eingeloggt!');
});

export default router;
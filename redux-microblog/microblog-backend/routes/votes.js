const db = require('../db');
const express = require('express');
const router = express.Router({ mergeParams: true });

router.patch('/upvote', async (req, res, next) => {
  try {
    const results = await db.query(
      'UPDATE posts SET upvote=upvote+1 WHERE id=$1 RETURNING * ',
      [req.params.post_id]
    );
    return res.json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch('/downvote', async (req, res, next) => {
  try {
    const results = await db.query(
      'UPDATE posts SET downvote=downvote+1 WHERE id=$1 RETURNING * ',
      [req.params.post_id]
    );
    return res.json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;

const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const results = await db.query(
      'select *, comments.id as c_id from comments right join posts as p on p.id = comments.post_id order by p.id'
    );
    let count = 0;
    let state = [];
    results.rows.forEach(p => {
      if (count !== p.id) {
        count = p.id;
        state.push({
          id: p.id,
          title: p.title,
          body: p.body,
          is_editing: false,
          is_commenting: false,
          upvote: p.upvote,
          downvote: p.downvote,
          comments: []
        });
      }

      if (p.c_id) {
        state[count - 1].comments.push({
          id: p.c_id,
          comment: p.comment,
          is_editing_comment: false
        });
      }
    });

    return res.status(200).json(state);
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const results = await db.query(
      'INSERT INTO posts (title,body, upvote, downvote) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.body.title, req.body.body, 0, 0]
    );
    return res.status(201).json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const results = await db.query(
      'UPDATE posts SET title=$1,body=$2 WHERE id=$3 RETURNING *',
      [req.body.title, req.body.body, req.params.id]
    );
    return res.status(200).json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const results = await db.query('DELETE FROM posts WHERE id=$1', [
      req.params.id
    ]);
    return res.status(200).json({ message: 'Post deleted' });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;

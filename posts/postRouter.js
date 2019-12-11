const express = require('express');
const db = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
  .then((data) => {
    req.post = data
    res.status(200).json(data)
  })
  .catch((err) => {
    next(err)
  })
});

router.get('/:id', (req, res) => {
  db.getById(req.params.id)
  .then((item) => {
    res.status(200).json(item)
  })
  .catch((err) => {
    next(err)
  })
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
  .then((info) => {
    res.status(203).json({ message: 'Deleted user' })
  })
  .catch((err) => {
    next(err)
  })
});

router.put('/:id', validatePost, (req, res) => {
  db.update(req.params.id, req.body)
  .then((data) => {
    res.status(203).json({ message: 'User has been updated' })
  })
});

// custom middleware

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: 'Missing post data' })
  } else if(!req.body.text) {
    res.status(400).json({ message: 'Post is missing text field' })
  } else {
    console.log('Post validated...')
  }
  next()
}
  
module.exports = router;

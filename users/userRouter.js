const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
  .then((update) => {
    res.status(203).json(update)
  })
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', validateUserId, (req, res) => {
  db.get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    next(err)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  db.getById(req.params.id)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((err) => {
    next(err)
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.id)
  .then((user) => {
    console.log('User ID validated...')
    next()
  })
  .catch((err) => {
    res.status(404).json({ message: 'User not found' })
  })
  next()
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: 'Missing user data' })
  } else if(!req.body.name) {
    res.status(400).json({ message: 'Missing user name' })
  } else {
    console.log('User validated...')
  }
  next()
}

module.exports = router;

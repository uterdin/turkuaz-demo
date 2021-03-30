var express = require('express');
const { response } = require('../app');
var router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'Ufkun' });
});

// CREATE
router.post('/users/create', (req, res, next) => {
  const { name, email } = req.body;
  db.any('INSERT INTO users VALUES (DEFAULT, $1, $2)', [name, email]);
});

// READ
router.get('/users', (req, res, next) => {
  db.any('SELECT * FROM users')
  .then((data) => {
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  })
});

// UPDATE
router.post('/users/update', (req, res, next) => {
  console.log('users update')
  const { id, name, email } = req.body;
  db.any('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
});

// DELETE
router.post('/users/delete', (req, res, next) => {
  const { id } = req.body;
  db.any('DELETE FROM users WHERE id = $1', [id]);
});

module.exports = router;

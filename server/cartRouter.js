const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const statsHandler = require('./statsHandler');
const router = express.Router();

router.get('/', (req, res) => { // /api/cart
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
  handler(req, res, 'add', './server/db/userCart.json');
  statsHandler(req.body.product_name, 'add', './server/db/stats.json');
});

router.put('/:id', (req, res) => {
  handler(req, res, 'change', './server/db/userCart.json');
  statsHandler(req.body.product_name, 'change', './server/db/stats.json');
});

router.delete('/:id', (req, res) => {
  handler(req, res, 'del', './server/db/userCart.json');
  statsHandler(req.product_name, 'del', './server/db/stats.json');
});

module.exports = router;

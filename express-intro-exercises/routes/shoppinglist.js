const express = require('express');
const router = express.Router();
let id = 1;
const items = [{ name: 'coffee', price: '5', id: id }];

router.get('/', function(req, res) {
  return res.json(items);
});

router.post('/', function(req, res) {
  console.log('req.body-->', req.body);
  const newItem = { name: req.body.name, price: req.body.price, id: ++id };
  items.push(newItem);
  return res.json(items);
});

router.get('/:id', function(req, res) {
  const founditem = items.filter(x => String(x.id) === req.params.id);
  console.log(founditem);

  return res.json(founditem);
});

router.patch('/:id', function(req, res) {
  const founditem = items.filter(x => String(x.id) === req.params.id);
  founditem[0].name = req.body.name;
  founditem[0].price = req.body.price;

  return res.json(items);
});

router.delete('/:id', function(req, res) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === Number(req.params.id)) {
      items.splice(i, 1);
    }
  }
  return res.json(items);
});

module.exports = router;

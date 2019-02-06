const express = require('express');
const router = express.Router();

const ff_controller = require('../controllers/ff.controller');


router.get('/m', ff_controller.test);


router.post('/post', ff_controller.insert);


router.get('/', function(req, res, next) {
  res.render('index', { title: 'ff' });
});

router.get('/submissions', ff_controller.displayAll);

router.get('/submissions/:id', ff_controller.displayUser);


// router.get('/submissions/:id/update', ff_controller.displayUser);

module.exports = router;
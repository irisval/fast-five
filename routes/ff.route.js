const express = require('express');
const router = express.Router();

const ff_controller = require('../controllers/ff.controller');


router.get('/m', ff_controller.test);


router.post('/post', ff_controller.insert);

router.post('/submitentry', ff_controller.createFF);

router.get('/', function(req, res, next) {
  res.redirect('/submissions');
});

router.get('/submissions', ff_controller.displayAll);

router.get('/submissions/:name', ff_controller.displayUser);
router.get('/fastfives', ff_controller.displayffs)

// router.get('/submissions/:id/update', ff_controller.displayUser);

module.exports = router;
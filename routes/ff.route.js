const express = require('express');
const router = express.Router();

const ff_insert_controller = require('../controllers/ff.insertController');
const ff_display_controller = require('../controllers/ff.displayController');



router.get('/m', ff_insert_controller.test);


router.post('/post', ff_insert_controller.insert);
// router.post('/submitentry', [check('fiveEntries', 'Need 5 Entries').custom(function(value, req) { req.body.entry.length == 5})], ff_insert_controller.createFF);
router.post('/submitentry', ff_insert_controller.createFF);
router.post('/setQuote/:id', ff_insert_controller.setQuote);
router.post('/editUser', ff_insert_controller.editUser)

router.get('/', function(req, res, next) {
  res.redirect('/submissions');
});

router.get('/submissions', ff_display_controller.displayAll);

router.get('/submissions/:name', ff_display_controller.displayUser);

router.get('/users', ff_display_controller.displayAllUsers);
router.get('/fastfives', ff_display_controller.displayffs)

// router.get('/submissions/:id/update', ff_controller.displayUser);

module.exports = router;


// https://auth0.com/blog/express-validator-tutorial/
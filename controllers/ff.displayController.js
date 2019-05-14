const FF = require('../models/ff.ff');
const User = require('../models/ff.user');
const ChosenFF = require('../models/ff.chosen')
let request = require('request');


exports.displayAll = function (req, res) {
    FF.find({}).sort({
        'timestamp': -1
    }).exec(function (err, s) {
        if (err)
            console.log(err);

        FF.find().distinct('week', function (err, w) {
            if (err)
                console.log(err);
            res.render('submissions', {
                'sub': s,
                'weeks': w,
                'title': 'bugaloo'
            });

        })
    });
}


exports.displayffs = function (req, res) {
    FF.find({
        "used": true
    }, function (err, e) {
        ChosenFF.find().distinct('week', function (err, w) {
            res.render('fastfives', {
                'entries': e,
                'weeks': w,
                'title': 'previous entries'
            })
        })
    })
}


exports.displayUser = function (req, res) {
    FF.find({
        "name": req.params.name
    }, function (err, s) {
        if (err)
            throw err;
        if (s.length > 0)
            res.render('submission', {
                'sub': s,
                'name': req.params.name,
                'title': 'bugaloo'
            });
        else
            res.redirect('/submissions');
    })
}

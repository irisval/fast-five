const mongoose = require('mongoose');
const FF = require('../models/ff.ff');
const User = require('../models/ff.user');
const ChosenFF = require('../models/ff.chosen')
let request = require('request');
const Mailchimp = require('mailchimp-api-v3');
const mailchimp = new Mailchimp(process.env.MAILCHIMP_KEY);
// ^ breaks if you use const

exports.test = function (req, res) {
    FF.find({
        "used": true
    }, function (err, e) {
        e.forEach(function (s, i) {
            s.used = false;
            s.save();
        });
        res.redirect('/submissions');
    });
}


exports.insert = function (req, res) {
    request({
        url: 'https://slack.com/api/channels.history',
        qs: {
            token: process.env.TOKEN,
            channel: process.env.CHANNEL,
            count: '150'
        },
        method: 'POST'
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            let slackRes = {
                response_type: "in_channel",
                text: "This week's fast five submissions have been generated!"
            };

            res.send(slackRes.text);

            let data = JSON.parse(body);
            let pastWeekMsgs = filterMsgs(data);
            let submissions = restructure(pastWeekMsgs);

            submissions.forEach(function (s, index) {
                getUser(s.uid, function (u) {
                    s.name = u;
                    console.log("HELLO " + s.uid);
                    console.log(s);
                    s.save(function (err) {
                        if (err)
                            console.log("well fuckaroo");
                        // else {
                        //    // console.log(s);
                        // }

                    });

                });


            })

        }
    })
};


exports.setQuote = function (req, res) {

    let q = req.body.format;
    let entryId = req.params.id;
  console.log(q);
    FF.findById(entryId, function (err, e) {
        e.actualQuote = q;
        e.save();
    });

    // FF.find({"used": true}, function(err, e) {
    //        ChosenFF.find().distinct('week', function(err, w) {
    //            res.render('fastfives', {'entries': e, 'weeks': w, 'title': 'previous entries'})
    //        })
    //    })

    console.log(req.body);
    res.status(204).send();
}


exports.createFF = function (req, res) {
    let entries = req.body.entry;
    let week = req.body.week;
    entries.map(function (i) {
        i = mongoose.Types.ObjectId(i);
    });

    c = new ChosenFF({
        week: week,
        entries: entries
    });
    c.save(function (err) {
        if (err)
            console.log("this is no bueno");
    });


    entries.forEach(function (e) {
        FF.findById(e, function (err, obj) {
            obj.used = true;
            obj.weekUsed = week;
            obj.save();
        })
    })

    // mailchimp.get('/templates/159753/default-content', {

    // }).then(function(result) {
    //     // console.log(result);
    //     console.log(result.sections.repeat_1);
    //     console.log(result.sections.repeat_1[0]);
    //     console.log(JSON.stringify(result.sections.repeat_1[0], null, 4));
    //     res.redirect('/fastfives');
    // }).catch(function(err) {
    //     console.log(err);
    // });

    mailchimp.post('/campaigns/', {
        type: 'regular',
        recipients: {list_id: process.env.AUDIENCE_ID},
        settings: {
            subject_line: 'v v v tired',
            preview_text: 'hello test',
            from_name: 'iris',
            reply_to: 'yolo@wearecmyk.com',
            to_name: 'uh',
            template_id: 159753
        }
    }).then(function(result) {
        console.log(result.id);
        var campaignId = result.id;
        var webId = result.web_id;
        mailchimp.put('/campaigns/' + campaignId + '/content', {
      
            template: {
                id: 159753,
                sections: {
                    "testcontent": "iris",
                    "victory": "VICTORY!!!!",
                    "adam_title": "awowowowwwww",
                    "adam_caption": "adam",
                    "adam_link_img": "https://www.google.com/",
                    "a2_title": "bwowowowwwww",
                    "a2_caption": "a2",
                    "a2_link_img": "https://www.google.com/",
                    "kevin_title": "cwowowowwwww",
                    "kevin_caption": "kevin",
                    "kevin_link_img": "https://www.google.com/",
                    "chris_title": "dwowowowwwww",
                    "chris_caption": "chris",
                    "chris_link_img": "https://www.google.com/",
                    "alexes_title": "ewowowowwwww",
                    "alexes_caption": "alexes",
                    "alexes_link_img": "https://www.google.com/",
                }
            }

        });
        console.log(result);
        res.redirect('/fastfives');
    }).catch(function(err) {
        console.log(err);
    });


   
   
    // FF.find({url: {$in: entryUrls}}, function(err, entries) {
    
}


function getWeek(v, l) {
    // let d = new Date(msg.ts*1000); do this for getting info for previous weeks
    d = new Date(v);
    elapsedDays = (l - (5 - d.getDay()) % 7);
    lastFri = d.getTime() - (elapsedDays * 86400000);
    d.setTime(lastFri);
    d.setHours(18);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setUTCMilliseconds(0);

    return d;
}


function filterMsgs(r) {
    let d = new Date();
    unixLastFri = getWeek(d, 21) / 1000;

    // filter by date
    msgs = r.messages;
    msgs = msgs.filter(function (m) {
        return (m.ts - unixLastFri) >= 0 && !m.hasOwnProperty("bot_id");
    });
    return msgs;
}

function comparator(a, b) {
    return a.ts - b.ts;
}

function getUserMessages(pastWeekMsgs, user) {
    let userMessages = pastWeekMsgs.filter(function (m) {
        return m.user == user;
    });

    userMessages.sort(comparator);
    return userMessages;
}

function neighborMessages(userMessages, msgID) {
    let neighbors = [];
    let i = userMessages.findIndex(function f(m) {
        return m.client_msg_id == msgID;
    });

    if (i != 0)
        neighbors.push(userMessages[i - 1].text);

    if (i != userMessages.length - 1)
        neighbors.push(userMessages[i + 1].text);

    return neighbors;
}

function getLQ(userMessages) {
    let i = userMessages.findIndex(function f(m) {
        return m.text.includes("LQ");
    });

    if (i == -1)
        return '';
    return userMessages[i].text;
}

function generateID() {
    var num = Math.floor(Math.random() * 90000000) + 10000000;
    return "GI-" + num;
}

// remove req & res


function getUser(uid, callback) {
    User.find({
        "uid": uid
    }, function (err, s) {

        if (err)
            throw err;
        if (s.length > 0)
            callback(s[0].name);
        else
            callback(createUser(uid));
    });
}

function createUser(uid) {
    request({
        url: 'https://slack.com/api/users.info',
        qs: {
            token: process.env.TOKEN,
            user: uid
        },
        method: 'POST'
    }, function (error, response, body) {
        if (error) {
            console.log(error)
        } else {
            let name = JSON.parse(body).user.name;

            u = new User({
                uid: uid,
                name: name
            });

            u.save(function (err) {
                if (err) {
                    console.log("")
                    // console.log("well fuck");
                    // console.log(err);
                    // duplicate key error COME BACK TO THIS
                } else {
                    return name;
                }

            });


        }
    });
}

function restructure(ml) {
    // var obj = new Object();
    let submissions = [];
    let s;
    let userID;
    let msg;
    let title;
    let name;
    let url;
    let userMessages;
    let possibleQuotes;
    let LQ;
    let ts;

    for (let i = 0; i < ml.length; i++) {
        msg = ml[i];
        userID = msg.user;

        if (msg.hasOwnProperty("attachments") && msg.attachments[0].title != undefined) {

            title = msg.attachments[0].title;
            url = msg.attachments[0].title_link;

            let ts = new Date(msg.ts * 1000);


            if (!msg.hasOwnProperty("client_msg_id"))
                msg.client_msg_id = generateID();
            userMessages = getUserMessages(ml, userID);
            possibleQuotes = neighborMessages(userMessages, msg.client_msg_id);

            if (msg.text.slice(1, -1) != url)
                possibleQuotes.push(msg.text);


            LQ = getLQ(userMessages);

            let week = getWeek(msg.ts * 1000, 7);
            // console.log(week);
            // this is garbage code fix this later

            let date = new Date(week);
            week = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();

            s = new FF({
                week: week,
                timestamp: ts,
                uid: userID,
                name: " ",
                title: title,
                url: url,
                possibleQuotes: possibleQuotes,
                LQ: LQ
            });

            submissions.push(s);


        }
    }

    return submissions;
}

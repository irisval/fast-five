const FF = require('../models/ff.model');
let request = require('request');
// ^ breaks if you use const
exports.test = function(req, res) {
	res.send('controller message');
};

exports.insert = function(req, res) {
	request({
		url: 'https://slack.com/api/channels.history',
		qs: {token: process.env.TOKEN, channel: process.env.CHANNEL, count: '150'},
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
            
            try {
                FF.insertMany(submissions);  
            } catch(e) {
                print(e);
            }
        }
	})
};

exports.display = function(req, res) {
    FF.find({}, function(err, s){
        if (err)
            throw err;
        // console.log(s);
        res.render('submissions', {'sub': s, 'title':'bugaloo'});
    });
    
};

function filterMsgs(r) {
    let d = new Date();
    elapsedDays =  (7 - (5 - d.getDay()) % 7);
    lastFri = d.getTime() - (elapsedDays * 86400000);

    d.setTime(lastFri);
    d.setHours(18);
    d.setMinutes(0);
    d.setSeconds(0);

    unixLastFri = d.getTime() / 1000;

    // filter by date
    msgs = r.messages;
    msgs = msgs.filter(function(m){
        return (m.ts - unixLastFri) >= 0 && !m.hasOwnProperty("bot_id");
    });
    return msgs;
}

function comparator(a, b) {
    return a.ts - b.ts;
}

function getUserMessages(pastWeekMsgs, user) { 
    let userMessages = pastWeekMsgs.filter(function(m){
        return m.user == user;
    });

    userMessages.sort(comparator);
    return userMessages;
}

function neighborMessages(userMessages, msgID) {
    let neighbors = [];
    let i = userMessages.findIndex(function f(m){
        return m.client_msg_id == msgID;
    });

    if (i != 0)
        neighbors.push(userMessages[i-1].text);
    
    if (i != userMessages.length - 1)
        neighbors.push(userMessages[i+1].text);

    return neighbors;
}

function getLQ(userMessages) {
    let i = userMessages.findIndex(function f(m){
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
    
        if (msg.hasOwnProperty("attachments")) {
            
           	title = msg.attachments[0].title;
            url = msg.attachments[0].title_link;
            ts = msg.ts;

            if (!msg.hasOwnProperty("client_msg_id"))
                msg.client_msg_id = generateID();
            userMessages = getUserMessages(ml, userID);
            possibleQuotes = neighborMessages(userMessages, msg.client_msg_id);

            if (msg.text.slice(1, -1) != url)
                possibleQuotes.push(msg.text);

    
            LQ = getLQ(userMessages); 

            s = new FF({
            	timestamp: ts,
            	name: userID,
            	title: title,
            	url: url,
            	possibleQuotes: possibleQuotes,
            	LQ: LQ
            });

           submissions.push(s)  
        } 
    }

    return submissions;
}
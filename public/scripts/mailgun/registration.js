require('dotenv').config();

var mailgun = require('mailgun-js')({apiKey: process.env.MG_API_KEY, domain: process.env.MG_DOMAIN});
module.exports = (username, email) => {

  var data = {
    from: 'do-not-reply@fantasysportboard.com',
    to: email,
    subject: 'Hello, ' + username,
    text: 'You\'re now registered for Fantasy Sport Board!'
  };

  mailgun.messages().send(data, function (error, body) {
  });
}
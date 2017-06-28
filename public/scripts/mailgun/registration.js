var api_key = 'key-624558cc4e4a1a9b1656d427ee6b8931';
var domain = 'sandbox9a8de5a1023443a8b97bab5b8a0dd9f9.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = (username, email) => {

  var data = {
    from: 'do-not-reply@fantasysportboard.com',
    to: email,
    subject: 'Hello, ' + username,
    text: 'You\'re now registered for Fantasy Sport Board!'
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}
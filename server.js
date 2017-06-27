'use strict';

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const sass        = require('node-sass-middleware');
const app         = express();
const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const createNewUser = require('./db/dbFunc/createNewUser');
const cookieSession = require('cookie-session');
const footballRoutes = require('./routes/football');
const leagueRoutes = require('./routes/league');
const draftRoutes = require('./routes/draft');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

app.use(cookieSession({
        name: 'session',
        secret: 'urlshy5hdyjtid'
    }))

// Home page
app.get('/', (req, res) => {
  res.redirect('/football');
});

// football routes
app.get('/football', footballRoutes(knex));

// league routes
app.get('/football/league', leagueRoutes(knex));
app.all('/football/league/create', leagueRoutes(knex));
app.get('/football/league/view', leagueRoutes(knex));
app.get('/football/league/:leagueID', leagueRoutes(knex));
app.all('/football/league/:leagueID/edit', leagueRoutes(knex));
app.all('/football/league/:leagueID/claim/:teamID', leagueRoutes(knex));
app.post('/football/league/:leagueID/remove/:teamID', leagueRoutes(knex));


// draft routes
app.all('/football/league/:leagueID/draft/create', draftRoutes(knex));
app.get('/football/league/:leagueID/draft/:draftID', draftRoutes(knex));

// account routes
app.get('/user/:userID', userRoutes(knex));
app.all('/register', registerRoutes(knex));
app.all('/login', loginRoutes(knex));
app.get('/logout', (req, res) => {
 req.session.userID = null;
 req.session.username = null;
 res.redirect('/');
});

// admin routes
app.get('/admin', adminRoutes(knex));
app.all('/admin/login', adminRoutes(knex));
app.all('/admin/playeradp', adminRoutes(knex));
app.get('/admin/players', adminRoutes(knex));
app.post('/admin/players/new', adminRoutes(knex));
app.all('/admin/players/:playerID', adminRoutes(knex));
app.post('/admin/players/:playerID/delete', adminRoutes(knex));
app.get('/admin/logout', (req, res) => {
 req.session.adminID = null;
 req.session.adminName = null;
 res.redirect('/');
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});

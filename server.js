const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// connecting hbs to functions in helpers file for formatting etc.
const hbs = exphbs.create({ helpers });

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'abc',
  cookie: {
    // Session expires after 10 mins of inactivity.
    expires: 600000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

// setting the express view engine to handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
// to handle json objects in routes
app.use(express.json());
// to handle URL inserts for routes
app.use(express.urlencoded({ extended: true }));
// to expose all code within the public folder
app.use(express.static(path.join(__dirname, 'public')));
// initilizing routes
app.use(routes);

// synce the DB and then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

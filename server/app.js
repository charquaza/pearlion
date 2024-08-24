require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const db = require('./models/index');
const indexRouter = require('./routes/index');

const app = express();

//Configure cors
const corsOptions = {
   origin: 'http://localhost:3003', //restrict to frontend domain after deployment
   credentials: true,
   optionsSuccessStatus: 200
};

//Set up connect-session-sequelize store
const sessionStore = new SequelizeStore({
   db: db.sequelize,
   tableName: 'sessions'
})
sessionStore.sync(); //create/sync session table

//Configure passport
passport.use(
   new LocalStrategy(async (username, password, done) => {
      try {
         let user = await db.User.findOne({ 
            where: {
               username: username 
            }
         });

         if (!user) {
            return done(null, false, { message: 'Incorrect username or password' });
         };
 
         user = user.get(); //get user data from Model instance object

         const passwordMatch = await bcrypt.compare(password, user.password);
         if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect username or password' });
         };
   
         return done(null, user);
      } catch(err) {
         return done(err);
      };
   })
);
passport.serializeUser((user, done) => {
   done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
   try {
      let user = await db.User.findByPk(id, { raw: true });
      //user = user.get();
      done(null, user);
   } catch(err) {
      done(err);
   };
}); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

//Set up sessions and passport
app.use(session({
   secret: process.env.SESSION_SECRET,
   name: 'sid',
   resave: false,
   saveUninitialized: false,
   cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
   },
   store: sessionStore
}));
app.use(passport.session());

//Set up router
app.use('/', indexRouter);

// catch 404
app.use(function(req, res, next) {
   res.status(404).json({ errors: ['Not found'] });
});

// error handler
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.json({ errors: [ err.message ] });
});

module.exports = app;
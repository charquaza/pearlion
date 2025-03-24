require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');

const db = require('./models/index');
const indexRouter = require('./routes/index');

const app = express();

//Configure cors
const corsOptions = {
   origin: process.env.FRONTEND_DOMAIN,
   credentials: true,
   optionsSuccessStatus: 200
};

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

passport.use(
   new JwtStrategy(
     {
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey : process.env.JWT_SECRET
     }, 
      async function (payload, done) {
         try {
            const user = await Member.findById(payload.id).exec();
            return done(null, user);
         } catch (err) {
            return done(err);
         }
      }
   )
);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

//Set up router
app.use('/',
   (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
         req.user = user; // Attach user (may be falsy) to request
         next();
      })(req, res, next);
   },
   indexRouter
);

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
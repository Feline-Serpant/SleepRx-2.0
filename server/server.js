const express = require('express');
const app = express();
const path = require('path');
const { debuglog } = require('util');
const router = require('./router/api');
// require('dotenv').config();
//const cookiSession = require('cookie-session')
//OAUTH TODO: Add steps in this file as well 

//const client_id = process.env.CLIENT_ID
//const client_secret = process.env.CLIENT_SECRET
app.use(express.json());

// express sessions
const session = require('express-session');
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'production') {
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
    });
    app.use('/build', express.static(path.join(__dirname, '../build')));
    // serve index.html on the route '/'
};

// instance of session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));
// changed the paths to match ours
  app.get('/auth', function(req, res) {
    res.render('auth/google');
  });

app.use('/api', router);

app.post('/register', (req, res) => {
    res.status(200).json(res.locals.user);
});
/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('auth/success', (req, res) => res.send(userProfile));
app.get('auth/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/* ^^^ PASSPORT SETUP ^^^ */

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { access } = require('fs');
// * They are now in .env file
const GOOGLE_CLIENT_ID = '1016245089654-i7k6f1o8n24ihivmdbjop6rlf4usv5fb.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'G804MGgcfuExuZfVF0QHzdm9';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(`This is user profile: ${profile}`)
      console.log(`This is access token: ${accessToken}`)
      console.log(`This is refresh token: ${refreshToken}`)
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'auth/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('auth/success');
  });

  /* ^^^  Google AUTH ^^^  */


//ALWAYS HAVE AT BOTTOM CATCHALL
app.get('*', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/public/index.html')));

// statically serve everything in the build folder on the route '/build'

app.listen(3000); //listens on port 3000 -> http://localhost:3000/


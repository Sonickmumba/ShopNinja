const LocalStrategy = require('passport-local').Strategy;
// const passport = require('passport');
const pool = require('../models/database');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    console.log(`Attempting to authenticate user with email: ${email}`);
    try {
      const response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = response.rows[0];
      console.log(user);

      if (!user) {
        console.log('No user found with that email');
        return done(null, false, {message: 'No user with that email'});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log('Password matched');
        return done(null, user);
      } else {
        console.log('Password incorrect');
        return done(null, false, {message: 'Password incorrect'});
      }
    } catch (error) {
        return done(error); 
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      const user = response.rows[0];
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};



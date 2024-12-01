const LocalStrategy = require("passport-local").Strategy;
// const passport = require('passport');
const pool = require("../models/database");
const bcrypt = require("bcrypt");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        console.log(`Attempting to authenticate user with email: ${email}`);
        try {
          const response = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
          );
          const user = response.rows[0];
          console.log(user);

          if (!user) {
            console.log("No user found with that email");
            return done(null, false, { message: "No user with that email" });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            console.log("Password matched");
            return done(null, user);
          } else {
            console.log("Password incorrect");
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // added

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/google/callback",
        passReqToCallback: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const googleId = profile.id;
          const email = profile.emails[0].value;

          // Check if user exists
          const response = await pool.query(
            "SELECT * FROM users WHERE google_id = $1 OR email = $2",
            [googleId, email]
          );
          let user = response.rows[0];

          if (!user) {
            // If user doesn't exist, create a new one
            const insertResponse = await pool.query(
              "INSERT INTO users (google_id, email, name) VALUES ($1, $2, $3) RETURNING *",
              [googleId, email, profile.displayName]
            );
            user = insertResponse.rows[0];
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // added

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const response = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      const user = response.rows[0];

      if (!user) {
        console.log("User not found during deserialization");
        return done(null, false);
      }

      console.log(`User deserialized: ${user.email}`);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

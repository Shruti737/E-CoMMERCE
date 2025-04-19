import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Code to handle user authentication and retrieval
    }
  )
);

passport.serializeUser((user, done) => {
  // Code to serialize user data
});

passport.deserializeUser((id, done) => {
  // Code to deserialize user data
});
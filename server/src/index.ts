import express from 'express';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import localStrategy from './auth/strategies/local.strategy';
import jwtStrategy from './auth/strategies/jwt.strategy';
import authRoutes from './auth/auth.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
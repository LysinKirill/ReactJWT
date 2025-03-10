import express from 'express';
import passport from 'passport';
import { login, profile } from './auth.controller';

const router = express.Router();

router.post('/login', (req, res, next) => {
    login(req, res).catch(next);
});

router.get('/profile', passport.authenticate('jwt', { session: false }), profile);

export default router;
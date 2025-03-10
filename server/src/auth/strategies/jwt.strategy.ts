import 'dotenv/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { findUserById } from '../../models/user.model';
import 'dotenv/config';

const jwtStrategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'secret',
    },
    async (payload, done) => {
        try {
            const user = findUserById(payload.id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);

export default jwtStrategy;
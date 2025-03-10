import { Strategy } from 'passport-local';
import { findUserByUsername } from '../../models/user.model';
import bcrypt from 'bcryptjs';

const localStrategy = new Strategy(async (username, password, done) => {
    try {
        const user = findUserByUsername(username);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

export default localStrategy;
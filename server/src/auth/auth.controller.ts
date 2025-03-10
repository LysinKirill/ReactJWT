import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByUsername } from '../models/user.model';

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    // Find the user
    const user = findUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h',
    });

    return res.json({ token });
};

export const profile = (req: Request, res: Response): void => {
    res.json({ user: req.user }); // No explicit return
};
import bcrypt from 'bcryptjs';

export interface User {
    id: number;
    username: string;
    password: string;
}

const mockUser: User = {
    id: 1,
    username: 'user',
    password: bcrypt.hashSync('password', 8),
};

export const findUserByUsername = (username: string): User | undefined => {
    if (username === mockUser.username) {
        return mockUser;
    }
    return undefined;
};

export const findUserById = (id: number): User | undefined => {
    if (id === mockUser.id) {
        return mockUser;
    }
    return undefined;
};
import {Router, Request, Response, NextFunction } from 'express';
import {login, createToken, verifyToken} from "../modules/auth";
export const authRouter = Router();

// Login route
authRouter.post('/', async <Send>(req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!await login(username, password)) {
        res.status(400).json({ message: 'Invalid credentials' });
    } else {
        const token = createToken(username);
        res.json({ token });
    }
});


export const checkAuthMiddleWhere =  (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
    } else {
        try {
            res.json({ message: 'Protected route', user: verifyToken(token) });
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    }
};
import {Router, Request, Response, NextFunction } from 'express';
import {login, createToken, verifyToken} from "../modules/auth";
export const authRouter = Router();

/**
 * @swagger
 * definitions:
 *   Login:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       path:
 *         type: string
 */

/**
 * @swagger
 * /api/login:
 *   get:
 *     description: Login to the application
 *     tags: [Login]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: User's login.
 *         in: query
 *         required: true
 *         type: string
 *         example: admin
 *       - name: password
 *         description: User's password.
 *         in: query
 *         required: true
 *         type: string
 *         example: password
 *     responses:
 *       200:
 *         description: token
 *         schema:
 *           type: string
 *       400:
 *         description: Invalid username/password supplied
 */

authRouter.get('/login', async <Send>(req: Request, res: Response): Promise<void> => {

    res.setHeader('Content-Type', 'application/json')
    const username: string = req.query.username.toString()
    const password: string = req.query.password.toString()

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
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    }

};
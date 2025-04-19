import express from 'express';
import {authRouter, checkAuthMiddleWhere} from './auth';
import {productsRouter} from './products';
import {Request, Response } from 'express';


export const routes = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Login
 *   - name: Products
 *     description: Products CRUD and list
 */


routes.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Index' });
});

routes.use('/api', authRouter);
routes.use('/api/products',checkAuthMiddleWhere, productsRouter);
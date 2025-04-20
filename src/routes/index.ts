import express from 'express';
import {authRouter, checkAuthMiddleWhere} from './auth';
import {productsRouter} from './products';
import {Request, Response } from 'express';
var bodyParser = require('body-parser')

export const routes = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Login
 *   - name: Products
 *     description: Products CRUD and list
 */

const jsonParser = bodyParser.json()

routes.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Index' });
});

routes.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


routes.use('/api', authRouter);
routes.use('/api/products',checkAuthMiddleWhere, jsonParser, productsRouter);
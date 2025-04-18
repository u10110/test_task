import express from 'express';
import {authRouter, checkAuthMiddleWhere} from './auth';
import {Router, Request, Response, NextFunction } from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "../swagger-generated.json";

export const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Index' });
});

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

routes.use(checkAuthMiddleWhere);

routes.use('/api/auth', authRouter);
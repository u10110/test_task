import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {routes} from "./routes";
import { version } from '../package.json';

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'API',
            version,
            description: 'API documentation',
            contact: {
                name: 'u10110',
                email: 'u10110.uu@gmail.com'
            },
        },
        components: {
            securitySchemes: {
                api_key: {
                    type: "apiKey",
                    name: "authorization",
                    in: "header"
                },
            }
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server'
            },
            {
                url: 'https://test.u10110.dev',
                description: 'Production server'
            }
        ]
    },
    apis: ['**/routes/**.ts', '**/routes/**.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', routes);

app.listen(8080, () => {
    console.log('Server started at port 8080');
});

module.exports.app = app;
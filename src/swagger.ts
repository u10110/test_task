import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Swagger TestTask',
        description: 'TestTask REST-full API'
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger-generated.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);
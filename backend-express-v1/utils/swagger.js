// import swaggerDocs
const swaggerJSDoc = require('swagger-jsdoc');

// import swaggerUi
const swaggerUi = require('swagger-ui-express');

// import app version from package-lock.json
const version = require('../package-lock.json').version;

// define swagger configurations
const options = swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API Docs',
            version,
            description: 'This is a REST API application made with Express. It sends & retrieves student data to & from a MongoDB database.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Return to The Student Score Application',
                url: 'http://localhost:5000',
                // url: 'https://.onrender.com',
            },
        },
        servers: [
            {
                url: 'https://.onrender.com',
                description: 'Production server'
            },
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    // swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // docs in JSON format
    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec);
    });

    console.log(`Documentation available at http://localhost:${port}/docs`);
};

// export swaggerDocs
module.exports = swaggerDocs;
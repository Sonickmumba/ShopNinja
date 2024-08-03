const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOption = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'ShopNinja',
      description: 'A swagger documentation setup for ShopNinja app',
      contact: {
        name: 'Sonick'
      },
      servers: [
        {
          url: 'http://localhost:3000/',
          description: 'local server',
        }
      ]

    },
    schemes: ['http', 'https']
  },
  apis: ['./routes/userRoutes.js'],
}

const specs = swaggerJSDoc(swaggerOption);
const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerDocs;
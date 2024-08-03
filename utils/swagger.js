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
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'local server',
      }
    ],

    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],

    schemes: ['http', 'https']
  },
  apis: ['./routes/userRoutes.js', './routes/productRoutes.js'],
}

const specs = swaggerJSDoc(swaggerOption);
const swaggerDocs = (app, port) => {

  // swagger page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

};

module.exports = swaggerDocs;
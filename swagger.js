import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
      title: 'My API',
      description: 'Description'
    },
    host: 'localhost:4000',
    schemes: ['http'],

    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter JWT token as: Bearer <your_token>',
      },
    },
  
    security: [
      {
        bearerAuth: [],
      },
    ],
  
  };
  
  const outputFile = './swagger-output.json';
  const routes = ['./routes/userRoutes.js', './routes/products.js'];
  
  swaggerAutogen()(outputFile, routes, doc);



  
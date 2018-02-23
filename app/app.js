let express = require('express');
let path = require('path');
// let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let app = express();
let swaggerJSDoc = require('swagger-jsdoc');
let swaggerUi = require('swagger-ui-express');

let api = require('./routes');

let options = {
  swaggerDefinition: {
    info: {
      title: 'Ecommerce',
      description:
        'Documentation of Ecommerce project made by team 13 of Web courses. '
          + 'University of Bordeaux.',
      version: '1.0.0',
      license: {
        name: 'GPL 3.0',
        url: 'https://www.gnu.org/licenses/gpl-3.0.en.html',
      },
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    host: 'localhost:3000',
    basePath: '/docs',
    tags: [
      {
        name: 'accounts',
        description: 'Everything about Accounts',
      },
      {
        name: 'users',
        description: 'Everything about Users',
      },
      {
        name: 'articles',
        description: 'Everything about Articles',
      },
      {
        name: 'carts',
        description: 'Everything about Carts',
      },
      {
        name: 'reviews',
        description: 'Everything about Carts',
      },
    ],
  },
  apis: [
    './swagger/**/*.yml',
  ], // Path to the API docs
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
let swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.get('/*', function(req, res) {
  res.send('hello world');
});

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');

const logger = require('./api/utils/logger');
const productRouter = require('./api/recursos/productos/productos.routes');
const usuariosRouter = require('./api/recursos/usuarios/usuarios.routes');

const productoController = require('./api/recursos/productos/productos.controller');

const authJWT = require('./api/libs/auth');
const errorHandler = require('./api/libs/errorHandler');
const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/training', { useNewUrlParser: true });
mongoose.connection.on('error', (error) => {
  logger.error(error);
  logger.error('Fallo la conexion a mongodb');
  process.exit(1);
});


app.use(bodyParser.json()); // IMPORTANTE!!!
// stream: message => logger.info(message.trim())
app.use(morgan('short', { 
  stream: {
    write: message => logger.info(message.trim()),
  } 
}));
app.use(passport.initialize());

app.use('/usuarios', usuariosRouter);
app.use('/productos', productRouter);


app.use(errorHandler.procesarErroresDeDB);
app.use(errorHandler.catchResolver);

passport.use(authJWT);


// passport.authenticate('jwt', { session: false });
app.get('/',(request, response) => {
  logger.error('Se hizo peticion al /');
  response.send('Hello World');
});


app.get('/search', (req, res) => {
  const titulo = req.query.titulo;
  console.log(titulo);  
  const pageNo = parseInt(req.query.pageNo);
  const size = parseInt(req.query.size);
  const query = {};
  if( pageNo < 0 || pageNo === 0) {
    response = {
    "error": true, 
    "message": "invalide page number, should start with 1",
    };
    return res.json(response);
  } 
  query.skip = size * (pageNo - 1);
  query.limit = size;
  return productoController.buscarProducto(titulo,query)
    .then(products => {
      console.log('productos', products);
      res.json(products);
    })
});

app.listen(8080, () => {
  console.log('Init server');
});

/*

passport.use(new BasicStrategy((username, password, done) => {
  if (username.valueOf() === 'luis' && password.valueOf() === 'krowdy123') {
    done(null, true);
  } else {
    done(null, false);
  }
}));
*/
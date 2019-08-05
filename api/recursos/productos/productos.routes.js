const express = require('express');
const uuidv4 = require('uuid/v4');
const Joi = require('@hapi/joi');

const productos = require('../../../db').productos;
const productsRoutes = express.Router();

const blueprintProducto = Joi.object().keys({
  titulo: Joi.string().min(3).max(100).required().error(() => 'error en la propiedad título'),
  precio: Joi.number().precision(2).strict().required().error(() => 'error en la propiedad precio'),
  moneda: Joi.string().max(3).required().error(() => 'error en la propiedad moneda'),
});
function validateProducto(req, res, next) {
  const joiResult = Joi.validate(req.body, blueprintProducto,{abortEarly: false});
  let err = []
  if (joiResult.error) { // TODO: Mejorar el mensaje de error.    
    joiResult.error.details.forEach(element => {
      err.push({message: element.message,type:element.type,context: element.context})      
    })
    console.log(err)
    res.status(400).send(err);
    return;
  }
  next();
}
// /productos/productos
productsRoutes.get('/', (req, res) => {
  res.json(productos);
});

productsRoutes.post('/', validateProducto, (req, res) => {
  const productoNuevo = { ...req.body, id: uuidv4() };
  productos.push(productoNuevo);
  res.status(201).json(productoNuevo);
});

productsRoutes.get('/:id', (req, res) => {
  let productoFilter;
  productos.forEach(producto => {
    if (producto.id === req.params.id) {
      productoFilter = producto;
    }
  });
  // productos.filter(producto => producto.id === req.params.id);
  res.json(productoFilter);
});

productsRoutes.put('/:id', validateProducto, (req, res) => {
  const id = req.params.id;
  let index;
  let productoFilter;
  productos.forEach((producto, i) => {
    if (producto.id === id) {
      index = i;
      productoFilter = producto;
    }
  });

  productos[index] = { ...productoFilter, ...req.body };
  res.json(productos[index]);
});

productsRoutes.delete('/:id', (req, res) => {
  const id = req.params.id;

  let index;
  let productoFilter;
  productos.forEach((producto, i) => {
    if (producto.id === id) {
      index = i;
      productoFilter = producto;
    }
  });

  productos.splice(index, 1);
  res.json(productoFilter);
});

module.exports = productsRoutes;
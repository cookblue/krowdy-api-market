const express = require('express');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const usuarioController = require('./usuarios.controller');

const validateUsuario = require('./usuarios.validate');
const usuarios = require('../../../db').usuarios;
const usuariosRoutes = express.Router();


usuariosRoutes.get('/', async (req, res) => {
  const usuarios = await usuarioController.obtenerUsuarios();
  res.json(usuarios);
});

//endpoint para crear usuario
usuariosRoutes.post('/', validateUsuario, async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      // logger.info(error)
      res.status(500).send(`A ocurrido un error en el servidor con bcrypt`);
      return
    }
    // todo hacer catch
    const newUser = { ...req.body, password: hashedPassword, id: uuidv4() };
    const usuario = await usuarioController.crearUsuario(newUser);
    res.status(201).send(`El usuario fue creado con exito.`);
  });

});

usuariosRoutes.post('/login', validateUsuario, async (req, res) => {
  const usuario = await usuarioController.obtenerUsuario(req.body.username)
  
  if (!usuario) {
    res.status(404).send(`El usuario no existe. Verifica tu informacion.`);
    return;
  }
  
  bcrypt.compare(req.body.password, usuario.password, (err, coincide) => {
    if (err) {
      console.log(err);
      res.status(500).send(`Algo ocurrio ups!`);
      return;
    }
    
    if (coincide) { 
      const token = jwt.sign({id: usuario['_id']}, 'secreto', { expiresIn: 86400 });
      res.status(200).send({token});
    } else {
      res.status(401).send(`Verifica tu password.`);
    }
  });
})

module.exports = usuariosRoutes;
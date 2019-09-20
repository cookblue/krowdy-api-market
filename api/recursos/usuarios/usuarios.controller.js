const Usuario = require('./usuarios.model');

function crearUsuario(user) {
  return new Usuario(user).save();
}

function obtenerUsuarios() {
  return Usuario.find({});
}

function actualizarUsuario(username, data) {
  console.log(data)
  return Usuario.findOneAndUpdate({ username: username }, {
    username: data
  }, { new: true });
}

function obtenerUsuario(username, id) {
    if (username) return Usuario.findOne({ username: username});
    if (id) return Usuario.findById(id);
}



module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
}

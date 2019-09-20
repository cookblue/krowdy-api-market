const Producto = require('./productos.model');

function crearProducto(producto) {
  return new Producto(producto).save();
}

function obtenerProductos() {
  return Producto.find({});
}

function obtenerProducto(id) {
  return Producto.findById(id);
}

function modificarProducto(id, producto) {
  return Producto.findOneAndUpdate({ _id: id}, {
    ...producto
  }, { new: true });
}

function eliminarProducto(id) {
  return Producto.findOneAndDelete(id);
}

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  modificarProducto,
  eliminarProducto,
}

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

function buscarProducto(text,query) {
 
  return Producto.find({"titulo": {$regex: '^' + text, $options: 'i'}},{},query,function(err,  data) {
    if(err) {
      response = {
        "error": true,
        "message": "Error fetching data"  
      };
    } else {
      response = {
        "error": false,
        "message": data,
      };
    }
   // res.json(response);
  })
  /*
  return Producto.find({
    "titulo": {$regex: text}
  });
  */
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
  buscarProducto,
}

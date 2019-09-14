# Krowdy Api Market

Aplicacion tipo MercadoLibre o Ebay donde los usuarios pueden: crear productos, modificarlos, borrarlos y visualizar productos de otros usuarios.

## Como correr el proyecto:

```
npm install
node index.js ó nodemon index.js
```

## Tecnologias que usaremos:

- Express
- MongoDB
- Passport
- Hapi 

## Postman Collection:

- https://www.getpostman.com/collections/8484e93e554840db77f3

## Documentacion

### Primera clase:

- Que es exactamente un API? :

https://medium.com/@perrysetgo/what-exactly-is-an-api-69f36968a41f

- Verbos(GET, POST, PUT, etc), HTTP, URLS, API REST explicado con ejemplos:

https://code.tutsplus.com/tutorials/a-beginners-guide-to-http-and-rest--net-16340


- Por que es importante validar nuestros datos:

https://www.quora.com/Why-is-data-validation-important



### Segunda clase:
- https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec 
- https://www.syslog-ng.com/community/b/blog/posts/why-logging-is-important
- https://www.youtube.com/watch?v=o9hT7v0OLJc


### Tareas de la Semana2 :

* Agregar los loggers a los endpoints correspondiendes utilizando log.error, log.warn. log.info.
* Hacer un middleware para la validacion de token.
* Agregar el middleware de validacion para los endpoints de productos que lo requieran.


### Tercera clase:
- https://medium.com/@yanyzx/mongodb-qu%C3%A9-es-c%C3%B3mo-funciona-y-cu%C3%A1ndo-podemos-usarlo-8eafe0d441c2
- 

### Tareas de la Semana 3 :

* Agregar los loggers a los endpoints correspondiendes utilizando log.error, log.warn. log.info. (Nuevamente) (Verificar)
* Verificar que los endpoint no tengan bugs. (Por ejemplo si un usuario con el username Luis.Angel ya existe, no puede registrarse otra persona con el mismo username)(Verificar los flujos para ver si pueden haber otros bugs).


## EVALUACION 
1. Implementa un endpoint que pueda filtrar productos por alguna coincidencia en el nombre (por ejemplo si el search indica 'zap', deberias devolver todos* los productos que en su nombre contengan 'zap' por ejemplo 'zapato'), utilizando validaciones, autenticacion.

* Ten en cuenta en grandes apliaciones como ebay o facebook, estas coincidencias contendrian millones de resultados, asi que tu respuesta podria ser demasiado grande, encuentra una forma de solucionar este problema.
* Asi como este problema habran algunos otros, divierte pensando cuales serian y cubrelos! 





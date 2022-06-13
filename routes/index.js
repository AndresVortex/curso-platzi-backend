const {Router} = require("express");

const productsRouter = require('./products.routes')
const usersRouter = require('./users.routes')
const categoriesRouter = require('./categories.routes')

function routesApi(app) {
  const router = Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter )
  router.use('/user', usersRouter )
  router.use('/categories', categoriesRouter )

}
module.exports = routesApi

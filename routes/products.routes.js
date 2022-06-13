const {Router} = require("express");


const ProductsServices = require("../services/product.service")
const validatorHandler = require("../middlewares/validator.handler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product.schema");



const router = Router()

const service = new ProductsServices()

router.get('/', async(req, res) => {

  const products = await service.find()

  res.json(products)
})

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {

  try {
    const {id} = req.params
    const product = await service.findOne(id)
    res.json(product)

  } catch (error) {
    console.log(error);
    next(error)
  }
})

router.post('/', validatorHandler(createProductSchema, 'body'), (req, res) => {
  const body = req.body
  const newProduct = service.create(body)
  res.status(201).json({
    message: "Created",
    data: newProduct
  })
})

router.patch('/:id',
[ validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), ],

(req, res, next) => {
  try {
    const {id} = req.params
    const body = req.body
    const product = service.update(id, body)
    res.json({
      id,
      message: "updated",
      data: product
    })

  } catch (error) {
    next(error)
  }
})
router.delete('/:id', (req, res) => {
  const {id} = req.params
  const rta = service.delete(id)
  res.json({
    id: rta.id,
    message: "deleted",
  })
})

module.exports = router

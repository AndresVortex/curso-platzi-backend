const boom = require('@hapi/boom')
const faker = require("faker")

class ProductsServices {

  constructor(){
    this.products = []
    this.generate()
  }

  generate(){
  const limit =  100
  for (let i = 0; i < limit; i++) {
    this.products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      img: faker.image.imageUrl(),
      isBlock: faker.datatype.boolean(),
    })

  }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.products.push(newProduct)

    return newProduct

  }

  async find(){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    })
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id)
    if (!product) {
      throw boom.notFound('product not fount')
    }
    if(product.isBlock){
      throw boom.conflict('product is block')

    }
    return product
  }
  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('product not fount')
    }
    const product  = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('product not fount')
    }
    this.products.splice(index, 1);
    return {id}
  }
}

module.exports = ProductsServices;

// Models/base/room.service.js
const { ProductModel } = require("../../models")

const Task = function (task) {
  this.task = task.task
}

Task.getProductBy = (data, connection) => ProductModel.getProductBy(data, connection)
Task.getProductById = (data, connection) => ProductModel.getProductById(data, connection)
Task.insertProduct = (data, connection) => ProductModel.insertProduct(data, connection)
Task.updateProductById = (data, connection) => ProductModel.updateProductById(data, connection)
Task.deleteProductById = (data, connection) => ProductModel.deleteProductById(data, connection)
Task.getProductOutOfStock = (data, connection) => ProductModel.getProductOutOfStock(data, connection)
Task.updateProductChechBillById = (data, connection) => ProductModel.updateProductChechBillById(data, connection)


module.exports = Task

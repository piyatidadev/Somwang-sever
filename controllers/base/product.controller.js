const { ProductService, } = require('../../services')

const Task = function (task) {
    this.task = task.task
}

Task.getProductBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await ProductService.getProductBy(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getProductById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await ProductService.getProductById(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.updateProductById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await ProductService.updateProductById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})

Task.updateProductChechBillById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await ProductService.updateProductChechBillById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})

Task.insertProduct = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await ProductService.insertProduct(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.deleteProductById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await ProductService.deleteProductById(req.body, connection)
        success()
        
    } catch (err) {
        error(err)
    }
})
Task.getProductOutOfStock = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await ProductService.getProductOutOfStock(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})


module.exports = Task
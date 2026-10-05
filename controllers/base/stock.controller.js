const { StockService, } = require('../../services')

const Task = function (task) {
    this.task = task.task
}

Task.getStockBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await StockService.getStockBy(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getStockStatusCheckBillBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await StockService.getStockStatusCheckBillBy(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getStockCheckBillBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await StockService.getStockCheckBillBy(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getStockById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await StockService.getStockById(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.updateStockById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await StockService.updateStockById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})

Task.updateCheckBillById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await StockService.updateCheckBillById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})

Task.insertStock = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await StockService.insertStock(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.deleteStockById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await StockService.deleteStockById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})


module.exports = Task


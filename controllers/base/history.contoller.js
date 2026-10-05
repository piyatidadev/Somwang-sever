const { HistoryService, } = require('../../services')

const Task = function (task) {
    this.task = task.task
}

Task.getHistoryBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await HistoryService.getHistoryBy(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getHistoryById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await HistoryService.getHistoryById(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.updateHistoryById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await HistoryService.updateHistoryById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.insertHistory = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await HistoryService.insertHistory(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.deleteHistoryById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await HistoryService.deleteHistoryById(req.body, connection)
        success()
        console.log('body',req.body);
        
    } catch (err) {
        error(err)
    }
})
Task.getHistoryOutOfStock = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await HistoryService.getHistoryOutOfStock(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.insertHistoryProduct = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await HistoryService.insertHistoryProduct(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getHistorySalesBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await HistoryService.getHistorySalesBy(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})


module.exports = Task

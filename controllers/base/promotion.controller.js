const { PromotionService, } = require('../../services')

const Task = function (task) {
    this.task = task.task
}

Task.getPromotionBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await PromotionService.getPromotionBy(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getPromotionById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await PromotionService.getPromotionById(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.updatePromotionById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await PromotionService.updatePromotionById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.insertPromotion = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await PromotionService.insertPromotion(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.deletePromotionById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await PromotionService.deletePromotionById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})


module.exports = Task
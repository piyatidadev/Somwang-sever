const { ProjectService, } = require('../../services')

const Task = function (task) {
    this.task = task.task
}

Task.getProjectBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await ProjectService.getProjectBy(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getProjectById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await ProjectService.getProjectById(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

Task.updateProjectById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await ProjectService.updateProjectById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.insertProject = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await ProjectService.insertProject(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.deleteProjectById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await ProjectService.deleteProjectById(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})
Task.getProductOutOfStock = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await ProjectService.getProductOutOfStock(req.body, connection)
        success()
    } catch (err) {
        error(err)
    }
})

module.exports = Task
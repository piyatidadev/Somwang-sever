const { PermissionService, } = require('../../services')

const Task = function (task) {
    this.task = task.task
}
Task.getPermissionBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await PermissionService.getPermissionBy(req.body, connection)

        success(result)
    } catch (err) {
        error(err)
    }
})
Task.updatePermissionById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await PermissionService.updatePermissionById(req.body, connection)

        success()
    } catch (err) {
        error(err)
    }
})
Task.insertPermission = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await PermissionService.insertPermission(req.body, connection)

        success()
    } catch (err) {
        error(err)
    }
})

module.exports = Task
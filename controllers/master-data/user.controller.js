const { UserService, } = require('../../services')

const Task = function (task) {
    this.task = task.task
}
Task.generateMemberLastCode = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await UserService.generateMemberLastCode(req.body, connection)

        success(result)
    } catch (err) {
        error(err)
    }
})
Task.checkLogin = (req, res) => req.useConnection(async (connection, success, error) => {
 
    try {
        const result = await UserService.checkLogin(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})
Task.checkUser = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await UserService.checkUser(req.body, connection)

        success(result)
    } catch (err) {
        error(err)
    }
})
Task.getUserBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await UserService.getUserBy(req.body, connection)

        success(result)
    } catch (err) {
        error(err)
    }
})
Task.getUserById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await UserService.getUserById(req.body, connection)

        success(result)
    } catch (err) {
        error(err)
    }
})
Task.updateUserById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await UserService.updateUserById(req.body, connection)

        success()
    } catch (err) {
        error(err)
    }
})
Task.insertUser = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await UserService.insertUser(req.body, connection)

        success()
    } catch (err) {
        error(err)
    }
})
Task.deleteUserById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await UserService.deleteUserById(req.body, connection)

        success()
    } catch (err) {
        error(err)
    }
})
Task.getLoginToken = (req, res) => req.useConnection(async (connection, success, error) => {
 
    try {
        const result = await UserService.getLoginToken(req.body, connection)
        success(result)
    } catch (err) {
        error(err)
    }
})

module.exports = Task
const { AttachmentService, } = require('../../services')

const Task = function (task) {
    this.task = task.task
}

Task.getAttachmentBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await AttachmentService.getAttachmentBy(req.body, connection)

        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getAttachmentById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await AttachmentService.getAttachmentById(req.body, connection)

        success(result)
    } catch (err) {
        error(err)
    }
})

Task.getAttachmentByRefId = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await AttachmentService.getAttachmentByRefId(req.body, connection)

        success(result)
    } catch (err) {
        error(err)
    }
})
Task.updateAttachmentById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await AttachmentService.updateAttachmentById(req.body, connection)

        success()
    } catch (err) {
        error(err)
    }
})
Task.updateAttachmentByRefId = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await AttachmentService.updateAttachmentByRefId(req.body, connection)

        success()
    } catch (err) {
        error(err)
    }
})
Task.insertAttachment = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await AttachmentService.insertAttachment(req.body, connection)

        success()
    } catch (err) {
        error(err)
    }
})
Task.deleteAttachmentById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        await AttachmentService.deleteAttachmentById(req.body, connection)

        success()
    } catch (err) {
        error(err)
    }
})


module.exports = Task
// Models/base/room.service.js
const { AttachmentModel } = require("../../models")

const Task = function (task) {
  this.task = task.task
}

Task.getAttachmentBy = (data, connection) => AttachmentModel.getAttachmentBy(data, connection)
Task.getAttachmentById = (data, connection) => AttachmentModel.getAttachmentById(data, connection)
Task.getAttachmentByRefId = (data, connection) => AttachmentModel.getAttachmentByRefId(data, connection)
Task.insertAttachment = (data, connection) => AttachmentModel.insertAttachment(data, connection)
Task.updateAttachmentById = (data, connection) => AttachmentModel.updateAttachmentById(data, connection)
Task.updateAttachmentByRefId = (data, connection) => AttachmentModel.updateAttachmentByRefId(data, connection)
Task.deleteAttachmentById = (data, connection) => AttachmentModel.deleteAttachmentById(data, connection)
module.exports = Task

// Models/base/room.service.js
const { ProjectModel } = require("../../models")

const Task = function (task) {
  this.task = task.task
}

Task.getProjectBy = (data, connection) => ProjectModel.getProjectBy(data, connection)
Task.getProjectById = (data, connection) => ProjectModel.getProjectById(data, connection)
Task.insertProject = (data, connection) => ProjectModel.insertProject(data, connection)
Task.updateProjectById = (data, connection) => ProjectModel.updateProjectById(data, connection)
Task.deleteProjectById = (data, connection) => ProjectModel.deleteProjectById(data, connection)
module.exports = Task

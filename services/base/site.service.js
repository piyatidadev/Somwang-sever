// Models/base/room.service.js
const { SiteModel } = require("../../models")

const Task = function (task) {
  this.task = task.task
}

Task.getSiteBy = (data, connection) => SiteModel.getSiteBy(data, connection)
Task.getSiteById = (data, connection) => SiteModel.getSiteById(data, connection)
Task.insertSite = (data, connection) => SiteModel.insertSite(data, connection)
Task.updateSiteById = (data, connection) => SiteModel.updateSiteById(data, connection)
Task.deleteSiteById = (data, connection) => SiteModel.deleteSiteById(data, connection)
module.exports = Task

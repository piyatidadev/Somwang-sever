// Models/base/room.service.js
const { PromotionModel } = require("../../models")

const Task = function (task) {
  this.task = task.task
}

Task.getPromotionBy = (data, connection) => PromotionModel.getPromotionBy(data, connection)
Task.getPromotionById = (data, connection) => PromotionModel.getPromotionById(data, connection)
Task.insertPromotion = (data, connection) => PromotionModel.insertPromotion(data, connection)
Task.updatePromotionById = (data, connection) => PromotionModel.updatePromotionById(data, connection)
Task.deletePromotionById = (data, connection) => PromotionModel.deletePromotionById(data, connection)
module.exports = Task

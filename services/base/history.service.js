// Models/base/room.service.js
const { HistoryModel,ProductModel } = require("../../models")

const Task = function (task) {
  this.task = task.task
}

Task.getHistoryBy = (data, connection) => HistoryModel.getHistoryBy(data, connection)
Task.getHistoryById = (data, connection) => HistoryModel.getHistoryById(data, connection)
Task.updateHistoryById = (data, connection) => HistoryModel.updateHistoryById(data, connection)
Task.deleteHistoryById = (data, connection) => HistoryModel.deleteHistoryById(data, connection)
Task.getHistoryOutOfStock = (data, connection) => HistoryModel.getHistoryOutOfStock(data, connection)
Task.getHistorySalesBy = (data, connection) => HistoryModel.getHistorySalesBy(data, connection)
Task.insertHistoryProduct = async (data, connection) => {
    const history = await HistoryModel.insertHistory(data, connection);
    const product = await ProductModel.updateProductCountById({ product_table_uuid: data.product_table_uuid, count : data.count }, connection);
}

module.exports = Task

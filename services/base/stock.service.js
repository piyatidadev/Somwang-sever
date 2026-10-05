// Models/base/room.service.js
const { StockModel, ProductModel } = require("../../models")

const Task = function (task) {
  this.task = task.task
}

Task.getStockBy = (data, connection) => StockModel.getStockBy(data, connection)
Task.getStockStatusCheckBillBy = (data, connection) => StockModel.getStockStatusCheckBillBy(data, connection)
Task.getStockCheckBillBy = (data, connection) => StockModel.getStockCheckBillBy(data, connection)
Task.getStockById = (data, connection) => StockModel.getStockById(data, connection)
Task.insertStock = (data, connection) => StockModel.insertStock(data, connection)
Task.updateStockById = (data, connection) => StockModel.updateStockById(data, connection)
// Task.updateCheckBillById = (data, connection) => StockModel.updateCheckBillById(data, connection)
Task.updateCheckBillById = async (data, connection) => {
  await StockModel.updateCheckBillById(
    {
      stock_table_uuid: data.stock_table_uuids,
      checkbill_by: data.checkbill_by
    },
    connection
  );
  for (const item of data.total_count_detail) {
    await ProductModel.updateProductChechBillById(
      {
        product_table_uuid: item.product_table_uuid,
        count: item.count
      },
      connection
    );
  }

  return { require: true };
};

Task.deleteStockById = (data, connection) => StockModel.deleteStockById(data, connection)
module.exports = Task

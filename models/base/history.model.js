const db = require("../../configs/db.json");
const { v4: uuidv4 } = require("uuid");
const Task = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};
Task.getHistoryBy = function getHistoryBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT tb1.*,
                tb2.product_name
                FROM ${db["base"]}.tb_history AS tb1
                LEFT JOIN ${db["base"]}.tb_product AS tb2 ON tb1.product_table_uuid = tb2.product_table_uuid
                Order by tb1.added_date DESC  
                `;

    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

Task.getHistoryById = function getHistoryById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
                FROM ${db["base"]}.tb_history
                WHERE history_table_uuid = ${connection.escape(data.history_table_uuid)} 
                `;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

Task.insertHistory = function insertHistory(data, connection) {
  console.log("data", data);
  return new Promise((resolve, reject) => {
    let history_table_uuid = uuidv4();
    let sql = `INSERT INTO ${db["base"]}.tb_history SET
                  history_table_uuid = ${connection.escape(history_table_uuid)},
                  product_table_uuid = ${connection.escape(data.product_table_uuid)},
                  count = ${connection.escape(data.count)},
                  create_date = now(),
                  create_by =  ${connection.escape(data.create_by)},
                  added_date =  ${connection.escape(data.added_date)},
                  is_active = true
    `;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: { insertId: history_table_uuid }, require: true });
      }
    });
  });
};

Task.updateHistoryById = function updateHistorytById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE  ${db["base"]}.tb_history SET
                  history_table_uuid = ${connection.escape(history_table_uuid)},
                  product_table_uuid = ${connection.escape(history_table_uuid)},
                  count = ${connection.escape(data.count)},
                  update_date = now(),
                  update_by = ${connection.escape(data.update_by)}
                  date = ${connection.escape(data.added_date)}
                 WHERE history_table_uuid = ${connection.escape(data.history_table_uuid)}`;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

Task.deleteHistoryById = function deleteHistoryById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
    DELETE FROM ${db["base"]}.tb_history WHERE history_table_uuid = ${connection.escape(data.history_table_uuid)}`;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

Task.getHistoryOutOfStock = function getHistoryOutOfStock(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT *
                FROM ${db["base"]}.tb_history AS tb1
                WHERE count <= 24 `;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

Task.getHistorySalesBy = function getHistorySalesBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT 
                DATE_FORMAT(tb1.checkbill_date, '%Y-%m') AS bill_month,
                tb1.product_table_uuid,
                tb2.product_name,
                SUM(tb1.stock_count) AS total_count,
                SUM(tb1.stock_count * tb1.stock_price) AS total_amount
                FROM somwang_db.tb_stock tb1
                LEFT JOIN somwang_db.tb_product tb2 ON tb1.product_table_uuid = tb2.product_table_uuid
                WHERE tb1.stock_status = 1 AND tb1.checkbill_date IS NOT NULL
                GROUP BY 
                DATE_FORMAT(tb1.checkbill_date, '%Y-%m'),
                tb1.product_table_uuid,
                tb2.product_name
                ORDER BY 
                bill_month DESC
                 `;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

module.exports = Task;

const db = require("../../configs/db.json")
const { v4: uuidv4 } = require("uuid")
const Task = function (task) {
  this.task = task.task
  this.status = task.status
  this.created_at = new Date()
}
Task.getPromotionBy = function getPromotionBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT *,
                tb2.product_name
                FROM ${db["base"]}.tb_promotion AS tb1
                LEFT JOIN ${db["base"]}.tb_product AS tb2 ON tb1.product_table_uuid = tb2.product_table_uuid
                WHERE true `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.getPromotionById = function getPromotionById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
                FROM ${db["base"]}.tb_promotion
                WHERE promotion_table_uuid = ${connection.escape(data.promotion_table_uuid)} 
                `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.insertPromotion = function insertPromotion(data, connection) {
  return new Promise((resolve, reject) => {
    // let sql = ""
    let promotion_table_uuid = uuidv4()
    let sql = `INSERT INTO ${db["base"]}.tb_promotion SET
                  promotion_table_uuid = ${connection.escape(promotion_table_uuid)},
                  product_table_uuid = ${connection.escape(data.product_table_uuid)},
                  promotion_name = ${connection.escape(data.promotion_name)},
                  promotion_price = ${connection.escape(data.promotion_price)},
                  promotion_count = ${connection.escape(data.promotion_count)},
                  create_date = now(),
                  create_by =  ${connection.escape(data.create_by)},
                  is_active = true
    `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: { insertId: promotion_table_uuid }, require: true })
      }
    })
  })
}

Task.updatePromotionById = function updatePromotionById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE  ${db["base"]}.tb_promotion SET
                  promotion_name = ${connection.escape(data.promotion_name)},
                  product_table_uuid = ${connection.escape(data.product_table_uuid)},
                  promotion_name = ${connection.escape(data.promotion_name)},
                  promotion_price = ${connection.escape(data.promotion_price)},
                  promotion_count = ${connection.escape(data.promotion_count)},
                  update_date = now(),
                  update_by = ${connection.escape(data.update_by)}
                 WHERE promotion_table_uuid = ${connection.escape(data.promotion_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.deletePromotionById = function deletePromotionById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
    DELETE FROM ${db["base"]}.tb_promotion WHERE promotion_table_uuid = ${connection.escape(data.promotion_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

module.exports = Task

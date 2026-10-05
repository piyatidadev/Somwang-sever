const db = require("../../configs/db.json")
const { v4: uuidv4 } = require("uuid")
const Task = function (task) {
  this.task = task.task
  this.status = task.status
  this.created_at = new Date()
}
Task.getProductBy = function getProductBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT tb1.*
                FROM ${db["base"]}.tb_product AS tb1
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

Task.getProductById = function getProductById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
                FROM ${db["base"]}.tb_product
                WHERE product_table_uuid = ${connection.escape(data.product_table_uuid)} 
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

Task.insertProduct = function insertProduct(data, connection) {
  console.log("data", data)
  return new Promise((resolve, reject) => {
    // let sql = ""
    let product_table_uuid = uuidv4()
    let sql = `INSERT INTO ${db["base"]}.tb_product SET
                  product_table_uuid = ${connection.escape(product_table_uuid)},
                  product_name = ${connection.escape(data.product_name)},
                  price = ${connection.escape(data.price)},
                  count = ${connection.escape(data.count)},
                  create_date = now(),
                  create_by =  ${connection.escape(data.create_by)},
                  added_date =  ${connection.escape(data.added_date)},
                  is_active = ${connection.escape(data.is_active)}
    `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: { insertId: product_table_uuid }, require: true })
      }
    })
  })
}

Task.updateProductById = function updateProducttById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE  ${db["base"]}.tb_product SET
                  product_table_uuid = ${connection.escape(data.product_table_uuid)},
                  product_name = ${connection.escape(data.product_name)},
                  price = ${connection.escape(data.price)},
                  count = ${connection.escape(data.count)},
                  update_date = now(),
                  update_by = ${connection.escape(data.update_by)},
                  added_date = ${connection.escape(data.added_date)}
                 WHERE product_table_uuid = ${connection.escape(data.product_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })  
}

Task.deleteProductById = function deleteProductById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
    DELETE FROM ${db["base"]}.tb_product WHERE product_table_uuid = ${connection.escape(data.product_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.getProductOutOfStock = function getProductOutOfStock(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT *
                FROM ${db["base"]}.tb_product AS tb1
                WHERE count <= 24 `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.updateProductChechBillById = function (data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
      UPDATE ${db["base"]}.tb_product 
      SET 
      count = count - ${connection.escape(data.count)}
      WHERE product_table_uuid = ${connection.escape(data.product_table_uuid)}
    `;

    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err });
      } else {
        resolve({ data: res, require: true });
      }
    }); 
  });
};

Task.updateProductCountById = function updateProductCountById(data, connection) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE ${db["base"]}.tb_product
      SET 
      count = count + ${connection.escape(Number(data.count))}
      WHERE product_table_uuid = ${connection.escape(data.product_table_uuid)}
    `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

module.exports = Task

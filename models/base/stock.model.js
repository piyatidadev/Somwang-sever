const db = require("../../configs/db.json")
const { v4: uuidv4 } = require("uuid")
const Task = function (task) {
  this.task = task.task
  this.status = task.status
  this.created_at = new Date()
}

Task.getStockBy = function getStockBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT tb1.*,
                tb2.promotion_name,
                tb3.product_name
                FROM ${db["base"]}.tb_stock AS tb1
                LEFT JOIN ${db["base"]}.tb_promotion AS tb2 ON tb1.promotion_table_uuid = tb2.promotion_table_uuid
                LEFT JOIN ${db["base"]}.tb_product AS tb3 ON tb1.product_table_uuid = tb3.product_table_uuid
                ORDER BY tb1.stock_status ASC;
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

Task.getStockStatusCheckBillBy = function getStockStatusCheckBillBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT tb1.*,
                tb2.promotion_name,
                tb3.product_name
                FROM ${db["base"]}.tb_stock AS tb1
                LEFT JOIN ${db["base"]}.tb_promotion AS tb2 ON tb1.promotion_table_uuid = tb2.promotion_table_uuid
                LEFT JOIN ${db["base"]}.tb_product AS tb3 ON tb1.product_table_uuid = tb3.product_table_uuid
                where tb1.stock_status = 1;
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

Task.getStockCheckBillBy = function getStockCheckBillBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
        SELECT
            m.stock_table,
            m.stock_table_uuids,
            m.total_price,
            COALESCE(pr.promotion_names, '') AS promotion_names,
            COALESCE(pp.total_promotion_count, 0) AS total_count,
            COALESCE(pp.product_names, '') AS detail,
            COALESCE(pp.product_table_uuids, JSON_ARRAY()) AS product_table_uuids,
            COALESCE(pp.total_promotion_count_detail, JSON_ARRAY()) AS total_count_detail
        FROM (
        SELECT
            stock_table,
            GROUP_CONCAT(stock_table_uuid SEPARATOR ', ') AS stock_table_uuids,
            SUM(stock_price) AS total_price
        FROM ${db["base"]}.tb_stock
            WHERE stock_status = 0
            GROUP BY stock_table
        ) m
        LEFT JOIN (
        SELECT
            s.stock_table,
            GROUP_CONCAT(DISTINCT p.promotion_name SEPARATOR ', ') AS promotion_names
            FROM ${db["base"]}.tb_stock s
            JOIN ${db["base"]}.tb_promotion p ON s.promotion_table_uuid = p.promotion_table_uuid
            AND p.is_active = 1
            WHERE s.stock_status = 0
            AND s.promotion_status = 1
            GROUP BY s.stock_table
        ) pr ON m.stock_table = pr.stock_table
        LEFT JOIN (
        SELECT 
            merged.stock_table,
            GROUP_CONCAT(
              CONCAT(
                      prod.product_name,'  ',
                      merged.total_count
                    )
              SEPARATOR ', ' ) AS product_names,
              JSON_ARRAYAGG(prod.product_table_uuid) AS product_table_uuids,
              SUM(merged.total_count) AS total_promotion_count,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  'product_table_uuid', prod.product_table_uuid,
                  'count', merged.total_count
                )
              ) AS total_promotion_count_detail
            FROM (
                SELECT
                  stock_table,
                  product_table_uuid,
                  SUM(total_count) AS total_count
                FROM (
                    SELECT 
                        stock_table,
                        product_table_uuid,
                        SUM(stock_count) AS total_count
                    FROM ${db["base"]}.tb_stock
                    WHERE stock_status = 0 
                      AND promotion_status = 2
                    GROUP BY stock_table, product_table_uuid
                    UNION ALL
                    SELECT
                        s.stock_table,
                        p.product_table_uuid,
                        SUM(p.promotion_count) AS total_count
                    FROM ${db["base"]}.tb_stock s
                    JOIN ${db["base"]}.tb_promotion p
                        ON s.promotion_table_uuid = p.promotion_table_uuid
                    WHERE s.stock_status = 0
                      AND s.promotion_status = 1
                    GROUP BY s.stock_table, p.product_table_uuid
                ) mix
                GROUP BY stock_table, product_table_uuid
            ) merged

            JOIN ${db["base"]}.tb_product prod
                ON merged.product_table_uuid = prod.product_table_uuid

            GROUP BY merged.stock_table
        ) pp
            ON m.stock_table = pp.stock_table
        ORDER BY CAST(m.stock_table AS UNSIGNED);
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

Task.getStockById = function getStockById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
                FROM ${db["base"]}.tb_stock
                WHERE stock_table_uuid = ${connection.escape(data.stock_table_uuid)} 
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

Task.insertStock = function insertStock(data, connection) {
  return new Promise((resolve, reject) => {
    let stock_table_uuid = uuidv4()
    let sql = `INSERT INTO ${db["base"]}.tb_stock SET
                  stock_table_uuid = ${connection.escape(stock_table_uuid)},
                  product_table_uuid = ${connection.escape(data.product_table_uuid)},
                  promotion_table_uuid = ${connection.escape(data.promotion_table_uuid)},
                  stock_table = ${connection.escape(data.stock_table)},
                  promotion_status = ${connection.escape(data.promotion_status)},
                  stock_count = ${connection.escape(data.stock_count)},
                  stock_status = 0,
                  stock_price = ${connection.escape(data.stock_price)},
                  holiday_status = ${connection.escape(data.holiday_status)},
                  description = ${connection.escape(data.description)},
                  create_date = now(),
                  create_by =  ${connection.escape(data.create_by)},
                  solution = ${connection.escape(data.solution)},
                  is_active = ${connection.escape(data.is_active)}
    `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: { insertId: stock_table_uuid }, require: true })
      }
    })
  })
}

Task.updateCheckBillById = function (data, connection) {
  return new Promise((resolve, reject) => {
    let uuids = [];
    if (Array.isArray(data.stock_table_uuid)) {
      uuids = data.stock_table_uuid;
    } else if (Array.isArray(data.stock_table_uuids)) {
      uuids = data.stock_table_uuids; 
    } else {
      return reject({
        data: [],
        require: false,
        err: "stock_table_uuid ต้องเป็น array"
      });
    }
    let sql = `
      UPDATE ${db["base"]}.tb_stock 
      SET 
        checkbill_by = ${connection.escape(data.checkbill_by)},
        checkbill_date = NOW(),
        stock_status = 1
      WHERE stock_table_uuid IN (${uuids.map(u => connection.escape(u)).join(',')})
    `;

    connection.query(sql, (err, res) => {
      if (err) reject({ data: [], require: false, err });
      else resolve({ data: res, require: true });
    });
  });
};



Task.updateStockById = function updateStockById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE  ${db["base"]}.tb_stock SET
                  product_table_uuid = ${connection.escape(data.product_table_uuid)},
                  promotion_table_uuid = ${connection.escape(data.promotion_table_uuid)},
                  stock_table = ${connection.escape(data.stock_table)},
                  promotion_status = ${connection.escape(data.promotion_status)},
                  stock_count = ${connection.escape(data.stock_count)},
                  stock_status = 0,
                  stock_price = ${connection.escape(data.stock_price)},
                  holiday_status = ${connection.escape(data.holiday_status)},
                  description = ${connection.escape(data.description)},
                  solution = ${connection.escape(data.solution)},
                  update_date = now(),
                  update_by = ${connection.escape(data.update_by)}
                 WHERE stock_table_uuid = ${connection.escape(data.stock_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.deleteStockById = function deleteStockById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
    DELETE FROM ${db["base"]}.tb_stock WHERE stock_table_uuid = ${connection.escape(data.stock_table_uuid)}`
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

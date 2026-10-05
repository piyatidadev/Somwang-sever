const db = require("../../configs/db.json");
const { v4: uuidv4 } = require("uuid");
const Task = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};
Task.getSiteBy = function getSiteBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT *,
                tb1.description as des_site,
                tb2.project_name
                FROM ${db["base"]}.tb_site AS tb1
                LEFT JOIN ${db["base"]}.tb_project AS tb2 ON tb1.project_table_uuid = tb2.project_table_uuid
                WHERE true 
                Order by tb2.project_name DESC
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

Task.getSiteById = function getSiteById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
              FROM ${db["base"]}.tb_site AS tb1
              WHERE site_table_uuid = ${connection.escape(data.site_table_uuid)} 
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

Task.insertSite = function insertSite(data, connection) {
  return new Promise((resolve, reject) => {
    // let sql = ""
    let site_table_uuid = uuidv4();
    let sql = `INSERT INTO ${db["base"]}.tb_site SET
                site_table_uuid = ${connection.escape(site_table_uuid)},
                project_table_uuid = ${connection.escape(data.project_table_uuid)},
                site_name = ${connection.escape(data.site_name)},
                description = ${connection.escape(data.description)},
                contact = ${connection.escape(data.contact)},
                create_date = now(),
                create_by =  ${connection.escape(data.create_by)},
                is_active = ${connection.escape(data.is_active)}
    `;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: { insertId: site_table_uuid }, require: true });
      }
    });
  });
};

Task.updateSiteById = function updateSiteById(data, connection) {
  console.log('data :>> ', data);
  return new Promise((resolve, reject) => {
    let sql = `UPDATE  ${db["base"]}.tb_site SET
                project_table_uuid = ${connection.escape(data.project_table_uuid)},
                site_name = ${connection.escape(data.site_name)},
                description = ${connection.escape(data.description)},
                contact = ${connection.escape(data.contact)},
                update_date = now(),
                update_by = ${connection.escape(data.update_by)}
                WHERE site_table_uuid = ${connection.escape(data.site_table_uuid)}`;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

Task.deleteSiteById = function deleteSiteById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
    DELETE FROM ${
      db["base"]
    }.tb_site WHERE site_table_uuid = ${connection.escape(
      data.site_table_uuid
    )}`;
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

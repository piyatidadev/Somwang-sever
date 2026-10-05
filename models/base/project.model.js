const db = require("../../configs/db.json")
const { v4: uuidv4 } = require("uuid")
const Task = function (task) {
  this.task = task.task
  this.status = task.status
  this.created_at = new Date()
}
Task.getProjectBy = function getProjectBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT *
                FROM ${db["base"]}.tb_project AS tb1
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

Task.getProjectById = function getProjectById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
                FROM ${db["base"]}.tb_project
                WHERE project_table_uuid = ${connection.escape(data.project_table_uuid)} 
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

Task.insertProject = function insertProject(data, connection) {
  return new Promise((resolve, reject) => {
    // let sql = ""
    let project_table_uuid = uuidv4()
    let sql = `INSERT INTO ${db["base"]}.tb_project SET
                  project_table_uuid = ${connection.escape(project_table_uuid)},
                  project_name = ${connection.escape(data.project_name)},
                  contract = ${connection.escape(data.contract)},
                  start_contract = ${connection.escape(data.start_contract)},
                  end_contract = ${connection.escape(data.end_contract)},
                  budget = ${connection.escape(data.budget)},
                  description = ${connection.escape(data.description)},
                  create_date = now(),
                  create_by =  ${connection.escape(data.create_by)},
                  is_active = ${connection.escape(data.is_active)}
    `
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: { insertId: project_table_uuid }, require: true })
      }
    })
  })
}

Task.updateProjectById = function updateProjectById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE  ${db["base"]}.tb_project SET
                  project_name = ${connection.escape(data.project_name)},
                  contract = ${connection.escape(data.contract)},
                  start_contract = ${connection.escape(data.start_contract)},
                  end_contract = ${connection.escape(data.end_contract)},
                  budget = ${connection.escape(data.budget)},
                  description = ${connection.escape(data.description)},
                  update_date = now(),
                  update_by = ${connection.escape(data.update_by)}
                 WHERE project_table_uuid = ${connection.escape(data.project_table_uuid)}`
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err })
      } else {
        resolve({ data: res, require: true })
      }
    })
  })
}

Task.deleteProjectById = function deleteProjectById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
    DELETE FROM ${db["base"]}.tb_project WHERE project_table_uuid = ${connection.escape(data.project_table_uuid)}`
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

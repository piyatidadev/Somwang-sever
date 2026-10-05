const db = require("../../configs/db.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Task = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};
Task.getAttachmentBy = function getAttachmentBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
                SELECT * 
                FROM ${db["base"]}.tb_attachment AS tb_attachment
                WHERE true `;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

Task.getAttachmentById = function getAttachmentById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
                FROM ${db["base"]}.tb_attachment
                WHERE attachment_id = ${connection.escape(data.attachment_id)} 
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

Task.getAttachmentByRefId = function getAttachmentByRefId(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
                FROM ${db["base"]}.tb_attachment
                WHERE ref_id = ${connection.escape(data.ref_id)} 
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

Task.insertAttachment = function insertAttachment(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = "";
    if (data.attachment.length > 0) {
      data.attachment?.map((item) => {
        let attachment_id = uuidv4();
        sql += `INSERT INTO ${db["base"]}.tb_attachment SET
                  attachment_id = ${connection.escape(attachment_id)},
                  base64 = ${connection.escape(item.base64)},
                  ref_id = ${connection.escape(data.ref_id)},
                  ref_vdo = ${connection.escape(item.ref_vdo)},
                  create_by =  ${connection.escape(item.user_id)},
                  create_date =  NOW();
    `;
      });
    } else {
      let attachment_id = uuidv4();
      sql = `INSERT INTO ${db["base"]}.tb_attachment SET
                  attachment_id = ${connection.escape(attachment_id)},
                  base64 = ${connection.escape(data.base64)},
                  ref_id = ${connection.escape(data.ref_id)},
                  ref_vdo = ${connection.escape(item.ref_vdo)},
                  create_by =  ${connection.escape(data.create_by)},
                  create_date =  now()
              `;
    }
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: [], require: true });
      }
    });
  });
};

Task.updateAttachmentById = function updateAttachmentById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE ${db["base"]}.tb_attachment SET 
        base64 = ${connection.escape(data.base64)},
        ref_id = ${connection.escape(data.ref_id)},
        ref_vdo = ${connection.escape(item.ref_vdo)},
        update_by =  ${connection.escape(data.update_by)},
        update_date =  ${connection.escape(data.update_date)},
        WHERE attachment_id = ${connection.escape(data.attachment_id)}`;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

Task.updateAttachmentByRefId = function updateAttachmentByRefId(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE ${db["base"]}.tb_attachment SET 
        ref_id = ${connection.escape(data.ref_id)},
        ref_vdo = ${connection.escape(item.ref_vdo)},
        update_by =  ${connection.escape(data.update_by)},
        update_date =  ${connection.escape(data.update_date)},
        WHERE ref_id = ${connection.escape(data.ref_id)}`;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
      } else {
        resolve({ data: res, require: true });
      }
    });
  });
};

Task.deleteAttachmentById = function deleteAttachmentById(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
    SELECT * FROM ${
      db["base"]
    }.tb_attachment WHERE ref_id = ${connection.escape(data.ref_id)};
    `;
    let sec_sql = `
     DELETE FROM ${db["base"]}.tb_attachment WHERE ref_id = ${connection.escape(
      data.ref_id
    )};
    `;
    connection.query(sql, (err, res) => {
      if (err) {
        reject({ data: [], require: false, err: err });
        return 0;
      }
      res.forEach((item) => {
        let filePath = "uploads/" + item.ref_vdo;
        fs.unlink(filePath, (err, data) => {
          if (err) {
            reject({ data: [], require: false, err: err });
          }
        });
      });
      connection.query(sec_sql, (err, response) => {
        if (err) {
          reject({ data: [], require: false, err: err });
          return 0;
        }
        resolve({ data: res, require: true });
      });
    });
  });
};

Task.deleteAttachmentBy = function deleteAttachmentBy(data, connection) {
  return new Promise((resolve, reject) => {
    let sql = `
    DELETE FROM ${db["base"]}.tb_attachment WHERE ref_id = ${connection.escape(
      data.ref_id
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

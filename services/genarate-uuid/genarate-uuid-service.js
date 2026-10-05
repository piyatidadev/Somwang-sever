const db = require("../../configs/db.json");
const { v4: uuidv4 } = require('uuid');
const Task = function (Task) {
    this.task = task.task
    this.status = task.status
    this.created_at = new Date()
}


Task.getGenarateUUIDById = function getGenarateUUIDById(data, connection) {
    const genarate_table_uuid = uuidv4();
    return genarate_table_uuid;
};

module.exports = Task;

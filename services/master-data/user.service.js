// services/base/building.service.js
const { UserModel, PermissionModel, LogLoginModel } = require("../../models")
const APP_CONFIG = require("../../configs/app")
const jwt = require("jsonwebtoken")

const Task = function (task) {
  this.task = task.task
}
Task.generateMemberLastCode = async (data, connection) => UserModel.generateMemberLastCode(data, connection)
Task.checkLogin = async (data, connection) => {
  let result = await UserModel.checkLogin(data, connection)
  const { user_table_uuid, role_id } = result.data[0]

  const permissions = await PermissionModel.getPermissionBy({ role_id }, connection)
  if (permissions.require) {
    result.x_access_token = jwt.sign({ user_table_uuid }, APP_CONFIG.secret, { expiresIn: 86400 })
    result.permissions_token = jwt.sign({ permissions: permissions.data }, APP_CONFIG.secret, { expiresIn: 86400 })
  }
  return result
}
Task.getUserBy = (data, connection) => UserModel.getUserBy(data, connection)
Task.getUserById = (data, connection) => UserModel.getUserById(data, connection)
Task.insertUser = (data, connection) => UserModel.insertUser(data, connection)
Task.updateUserById = (data, connection) => UserModel.updateUserById(data, connection)
Task.deleteUserById = (data, connection) => UserModel.deleteUserById(data, connection)
Task.getLoginToken = async (data, connection) => {
  let result = await UserModel.checkLogin(data, connection)
  const { user_table_uuid, role_id } = result.data[0]

  const permissions = await PermissionModel.getPermissionBy({ role_id }, connection)
  if (permissions.require) {
    result.x_access_token = jwt.sign({ user_table_uuid }, APP_CONFIG.secret, { expiresIn: 86400 })
    result.permissions_token = jwt.sign({ permissions: permissions.data }, APP_CONFIG.secret, { expiresIn: 86400 })
  }
  return {x_access_token: result.x_access_token}
}

module.exports = Task

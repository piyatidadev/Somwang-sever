const { RoleService } = require('../../services');

const Task = function (task) {
    this.task = task.task;
}

Task.getRoleBy = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await RoleService.getRoleBy(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});


Task.getRoleById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = await RoleService.getRoleById(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});

Task.insertRole = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        const result = await RoleService.insertRole(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});

Task.updateRoleById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        const result = await RoleService.updateRoleById(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});

Task.deleteRoleById = (req, res) => req.useTransaction(async (connection, success, error) => {
    try {
        const result = await RoleService.deleteRoleById(req.body, connection);
        success(result);
    } catch (err) {
        error(err);
    }
});

module.exports = Task;

const { GenarateUUIDService } = require('../../services/genarate-uuid');
const { v4: uuidv4 } = require('uuid');

const Task = function (task) {
    this.task = task.task;
}


Task.getGenarateUUIDById = (req, res) => req.useConnection(async (connection, success, error) => {
    try {
        const result = {data:uuidv4(),require:true}
        success(result);
    } catch (err) {
        error(err);
    }
});

module.exports = Task;

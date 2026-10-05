const db = require("../../configs/db.json");
const { v4: uuidv4 } = require('uuid');
const { GenarateUUIDController } = require("../../controllers");

module.exports = function (app) {
    app.post('/getGenarateUUIDById', GenarateUUIDController.getGenarateUUIDById)
};


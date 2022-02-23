const router = require('express').Router();
const getVehicleDataFromDB = require('../controllers/getVehicleDataFromDB');

router.get('/', getVehicleDataFromDB.getStoredData);

module.exports = router;

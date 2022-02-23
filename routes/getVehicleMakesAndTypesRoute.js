const router = require('express').Router();
const getVehicleMakesAndTypesController = require('../controllers/getVehicleMakesAndTypesController');

router.get('/', getVehicleMakesAndTypesController.getAllData);

module.exports = router;

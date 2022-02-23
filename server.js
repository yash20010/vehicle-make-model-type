const express = require('express');
const getVehicleMakesAndTypes = require('./routes/getVehicleMakesAndTypesRoute');
const getVehicleDataFromDB = require('./routes/getVehicleDataFromDB');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/', getVehicleDataFromDB);
app.use('/fetchLatestData', getVehicleMakesAndTypes);

const PORT = process.env.PORT || 2121;

app.listen(PORT, () => {
  console.log('Server is running on port 2121');
});

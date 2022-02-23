const axios = require('axios');
const convertToJSON = require('./xmlToJson');

async function addVehicleTypes({ Make_ID, Make_Name }) {
  try {
    const vehicleTypes = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${Make_ID[0]}?format=XML`
    );
    const vehicleTypesJson = vehicleTypes.data;
    const jsonData = await convertToJSON(vehicleTypesJson);

    const vehicleTypesArray =
      jsonData.Response.Results[0].VehicleTypesForMakeIds;

    const finalData = {
      Make_ID,
      Make_Name,
      VehicleTypes: vehicleTypesArray,
    };
    return finalData;
  } catch (error) {
    console.log(error);
  }
}

module.exports = addVehicleTypes;

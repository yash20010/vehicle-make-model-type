const rateLimitingRequests = require('../middleware/rateLimitingReq');
const convertToJSON = require('../middleware/xmlToJson');
const axios = require('axios');

module.exports = {
  getAllData: async (req, res) => {
    try {
      const makes = await axios.get(
        'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML'
      );
      const makesJson = makes.data;
      const jsonData = await convertToJSON(makesJson);
      const allVehicleMakes = jsonData.Response.Results[0].AllVehicleMakes;
      console.log(allVehicleMakes.length);

      // fs.writeFileSync('./vehicleMakes.json', JSON.stringify(allVehicleMakes));
      let finalData = await rateLimitingRequests(allVehicleMakes);
      // fs.writeFileSync('./vehicleMakesAndTypes.json', JSON.stringify(finalData));
      res.send(finalData);
    } catch (error) {
      console.log(error);
    }
  },
};

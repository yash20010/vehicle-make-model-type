const rateLimitingRequests = require('../util/rateLimitingReq');
const convertToJSON = require('../util/xmlToJson');
const axios = require('axios');
const formattedDate = require('../util/formattedDate');
const { MongoClient } = require('mongodb');

module.exports = {
  getAllData: async (req, res) => {
    try {
      const client = new MongoClient(process.env.MONGO_URL);
      await client.connect();
      const database = client.db('myFirstDatabase');
      const vehicleData = database.collection(formattedDate(new Date()));
      // query for movies that have a runtime less than 15 minutes

      const data = vehicleData.find();

      if ((await data.count()) > 0) {
        let array = [];
        await data.forEach((e) => {
          const { _id, ...restOfData } = e;
          array.push(restOfData);
        });
        await client.close();
        console.log('Found the current data in the database');
        res.status(200).json(array);
      } else {
        console.log('Did not find current any data in the database');
        const makes = await axios.get(
          'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML'
        );
        const makesJson = makes.data;
        const jsonData = await convertToJSON(makesJson);
        const allVehicleMakes = jsonData.Response.Results[0].AllVehicleMakes;
        console.log(allVehicleMakes.length);
        let finalData = await rateLimitingRequests(allVehicleMakes);
        res.send(finalData);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

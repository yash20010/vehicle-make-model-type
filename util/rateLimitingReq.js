const addVehicleTypes = require('./addVehicleType');
const Vehicle = require('../model/Vehicle');
const { newCollection } = require('../database/database');
const formattedDate = require('./formattedDate');

async function rateLimitingRequests(params) {
  try {
    let startOfFetch = Date.now();
    let results = [];
    while (params.length > 0) {
      let batch = [];
      let startTime = Date.now();
      let length = params.length;
      for (let i = 0; i < Math.min(50, length); i++) {
        let thisParams = params.pop();
        batch.push(addVehicleTypes(thisParams));
      }
      let resultsBatch = await Promise.all(batch);
      results = results.concat(resultsBatch);

      // Database

      await newCollection(formattedDate(new Date()), resultsBatch);

      let endTime = Date.now();
      let timeElapsed = endTime - startTime;
      console.log(
        `Fetched ${results.length} records in ${timeElapsed / 1000}s`
      );
      if (timeElapsed < 5000) {
        await delay(5000 - timeElapsed);
      }
    }
    endOfFetch = Date.now();
    console.log(
      `Fetched ${results.length} results in ${
        (endOfFetch - startOfFetch) / 1000 / 60
      } minutes`
    );
    return results;
  } catch (error) {
    console.log(error);
  }
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

module.exports = rateLimitingRequests;

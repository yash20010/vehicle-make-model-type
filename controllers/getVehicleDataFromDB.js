const formattedDate = require('../util/formattedDate');

const { MongoClient } = require('mongodb');

module.exports = {
  getStoredData: async (req, res) => {
    const client = new MongoClient(process.env.MONGO_URL);
    async function run() {
      let array = [];
      try {
        await client.connect();
        const database = client.db('myFirstDatabase');
        const vehicleData = database.collection(formattedDate(new Date()));
        // query for movies that have a runtime less than 15 minutes

        const data = vehicleData.find();
        // print a message if no documents were found
        if ((await data.count()) === 0) {
          console.log('No documents found!');
        }
        // replace console.dir with your callback to access individual elements
        await data.forEach((e) => {
          const { _id, ...restOfData } = e;
          array.push(restOfData);
        });
      } finally {
        await client.close();
        return array;
      }
    }
    try {
      const dataArr = await run().catch(console.dir);
      console.log(dataArr.length);
      console.log(formattedDate(new Date()));
      res.status(200).json(dataArr);
    } catch (error) {
      console.log(error);
    }
  },
};

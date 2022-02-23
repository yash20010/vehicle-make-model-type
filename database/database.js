const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const newCollection = async (date, array) => {
  MongoClient.connect(process.env.MONGO_URL, (err, db) => {
    if (err) throw err;
    const dbo = db.db('myFirstDatabase');
    // dbo.createCollection(date, function (err, res) {
    //   if (err) throw err;
    //   console.log('Collection created!');
    //   db.close();
    // });
    // array.forEach((doc) => {
    //   dbo.collection(date).insertOne(doc, function (err, res) {
    //     if (err) throw err;
    //   });
    // });
    dbo.collection(date).insertMany(array, function (err, res) {
      if (err) throw err;
      console.log(`Inserted ${array.length} documents!`);
      db.close();
    });
  });
};

// const findCollection = async (date) => {
//   let arr = [];
//   MongoClient.connect(process.env.MONGO_URL, (err, db) => {
//     if (err) throw err;
//     const dbo = db.db('myFirstDatabase');
//     arr = dbo.collection(date).find();
//     db.close();
//   });
//   return arr;
// };

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     const date = new Date();

//     await client.db('date');
//     console.log('Created new collection successfully');
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

module.exports = { newCollection };

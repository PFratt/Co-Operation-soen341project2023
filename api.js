const express = require('express');
const app = express();

// Connect to MongoDB database
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cooperation:SOEN341uu@soen341db.6srii44.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log('Before connect');
(async () => {
  try {
    await client.connect();
    console.log('Success.');

    const collection = client.db("SOEN341DB").collection("users");

    // perform actions on the collection object
    // Set up a route to retrieve data from the users collection
    app.get('/users', async (req, res) => {
        try {
          const usersData = await collection.find().toArray();
          res.send(usersData);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'An error occurred' });
        }
    });

    // Turning on express app to listen at that port. Specify IPv4 for listening.
    app.listen(5000, () => {
        console.log('Server listening on port 5000');
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
console.log('After connect');






const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const secretKey = 'soen341courseterm4';

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

    // Set up a route to retrieve data from the users collection
    app.get('/users', async (req, res) => {
        // Verify the token
        console.log(req);
        const token = req.header('Authorization').replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, secretKey);
            console.log('Decoded:', decoded);
        } catch (error) {
            console.error(error);
            return res.status(401).send({ message: 'Invalid token' });
        }

        try {
            const usersData = await collection.find().toArray();
            res.send(usersData);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'An error occurred' });
        }
    });

    // Add a route for token generation
    app.post('/login', async (req, res) => {
        // Retrieve the user's credentials from the request body
        const username = req.body.username;
        const password = req.body.password;
        console.log(`Login request at ${req.query}`);
        console.log(req.body);

        // Check if the user exists in the database
        const user = await collection.findOne({ username, password });
        if (!user) {
            return res.status(401).send({ message: 'Incorrect username or password' });
        }

        // Generate a JWT
        const accessToken = jwt.sign({ username }, secretKey, { expiresIn: '2h' });

        // Send the token to the client
        res.send({ accessToken });
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







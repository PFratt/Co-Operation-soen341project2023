const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Allow all CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

const secretKey = 'soen341courseterm4';

// Connect to MongoDB database
const { MongoClient, ServerApiVersion } = require('mongodb');
const { send } = require('process');
const uri = "mongodb+srv://cooperation:SOEN341uu@soen341db.6srii44.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log('Before connect');
(async () => {
  try {
    await client.connect();
    console.log('Success.');

    const collection = client.db("SOEN341DB").collection("users");

    app.get('/testget', async(req, res) => {
        console.log("Request at get");
        res.status(200).send("Received request");
    });

    app.post('/testpost', async(req, res) => {
        console.log("Request at post");
        res.status(200).send("Received request");
    });


    // Set up a route to retrieve data from the student users
    app.get('/users/students', async (req, res) => {
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
            const usersData = await collection.find({usertype:"student"}).toArray();
            res.send(usersData);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'An error occurred' });
        }
    });

     // Set up a route to retrieve data from the employer users
     app.get('/users/employers', async (req, res) => {
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
            const usersData = await collection.find({usertype:"employer"}).toArray();
            res.send(usersData);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'An error occurred' });
        }
    });

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
        console.log(req.url);
        console.log(req.body);
        const { email, password, usertype } = req.body;
        console.log(`Login request at ${req.query}`);

        // Check if the user exists in the database
        const user = await collection.findOne({ email, password });

        if (!user) {
            return res.status(401).send({ message: 'Incorrect username or password' });
        }

        // Generate a JWT
        const accessToken = jwt.sign({ email }, secretKey, { expiresIn: '2h' });

        // Send the token to the client
        res.send({ accessToken });
    });

    // Add a new user
    app.post('/signup', async (req, res) => {
        // Retrieve the user's credentials from the request body
        console.log(req.url);
        console.log(req.body);
        const { name, email, password, usertype } = req.body;
        console.log(`Signup request at ${req.query}`);

        const myObj = {
            name: name,
            email: email,
            password: password,
            usertype: usertype
        };

        // Generate a JWT
        const accessToken = jwt.sign({ email }, secretKey, { expiresIn: '2h' });

        // Check if the user exists in the database
        const user = await collection.findOne({email: email});
        if(user){
            return res.status(406).send("Email already used by another user.");
        } else {
            await collection.insertOne(myObj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
        }
        res.status(200).send({accessToken}); 
    });

    app.get('/validate', async (req, res) => {
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
        
        res.status(200).send("Token still valid.");
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







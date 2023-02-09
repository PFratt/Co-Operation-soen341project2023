const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Allow all CORS
app.use((req, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT"
    );
    response.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
});

const secretKey = 'soen341courseterm4';

// Connect to MongoDB database
const { MongoClient, ServerApiVersion } = require('mongodb');
const { send } = require('process');
const { stat } = require('fs');
const uri = "mongodb+srv://cooperation:SOEN341uu@soen341db.6srii44.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log('Before connect');
(async () => {
    try {
        await client.connect();
        console.log('Success.');

        const collection = client.db("SOEN341DB").collection("users");
        const jobs = client.db("SOEN341DB").collection("jobs");
        const profiles = client.db("SOEN341DB").collection("profiles");
        const applications = client.db("SOEN341DB").collection("applications");


        app.get('/testget', async (req, res) => {
            console.log("Request at get");
            res.status(200).send("Received request");
        });

        app.post('/testpost', async (req, res) => {
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
                const usersData = await collection.find({ usertype: "student" }).toArray();
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
                const usersData = await collection.find({ usertype: "employer" }).toArray();
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

            if (user.usertype != usertype) {
                return res.status(401).send({ message: `Registered user is not ${usertype}.` });
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

            const numberholder = await collection.findOne({ "Number": "Holder" });
            console.log(numberholder);

            let userId = 0;
            if (typeof numberholder.userId === "number") {
                userId = numberholder.userId + 1;
            } else if (typeof numberholder.userId === "string") {
                userId = parseInt(numberholder.userId, 10) + 1;
            }

            const userID = userId;
            console.log(userID);

            await collection.updateOne(
                { "Number": "Holder" },
                { $set: { "userID": userID } }
            );


            const myObj = {
                name: name,
                email: email,
                password: password,
                usertype: usertype,
                id: userID
            };

            // Generate a JWT
            const accessToken = jwt.sign({ email }, secretKey, { expiresIn: '2h' });

            // Check if the user exists in the database
            const user = await collection.findOne({ email: email });
            if (user) {
                return res.status(406).send("Email already used by another user.");
            } else {
                await collection.insertOne(myObj, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                });
            }
            res.status(200).send({ accessToken });
        });

        // Modify an existing user
        app.put('/modifyuser/:id', async (req, res) => {
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
            // Retrieve the user's credentials from the request body
            console.log(req.url);
            console.log(req.body);
            const { name, email, password, usertype } = req.body;

            const id = req.params.id;

            try {
                // Check if the user exists in the database
                const user = await collection.findOne({ id: id });
                if (!user) {
                    return res.status(404).send("User not found.");
                } else {
                    // Update the user in the database
                    await collection.updateOne({ id: id }, { $set: { name: name, email: email, password: password, usertype: usertype } });
                    res.status(200).send({ message: 'User updated successfully' });
                }
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'An error occurred' });
            }
        });

        // Delete an existing user
        app.delete('/deleteuser/:id', async (req, res) => {
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
            const id = req.params.id;

            try {
                // Check if the user exists in the database
                const user = await collection.findOne({ id: id });
                if (!user) {
                    return res.status(404).send("User not found.");
                } else {
                    // Delete the user from the database
                    await collection.deleteOne({ id: id });
                    res.status(200).send({ message: 'User deleted successfully' });
                }
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'An error occurred' });
            }
        });

        // Add a new profile
        app.post('/addprofile', async (req, res) => {
            // Retrieve the user's credentials from the request body
            console.log(req.url);
            console.log(req.body);
            const { userID, headline, description } = req.body;

            const token = req.header('Authorization').replace('Bearer ', '');
            try {
                const decoded = jwt.verify(token, secretKey);
                console.log('Decoded:', decoded);
            } catch (error) {
                console.error(error);
                return res.status(401).send({ message: 'Invalid token' });
            }

            const myObj = {
                userID: userID,
                headline: headline,
                description: description
            };

            const profile = await profiles.findOne({ userID: userID });
            if (profile) {
                return res.status(406).send("User already has a profile.");
            } else {
                // Insert new job posting in database.
                await jobs.insertOne(myObj, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                });
            }

            res.status(200).send({ myObj });
        });

        // Get list of all jobs
        app.get('/profiles', async (req, res) => {
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
                const profilesData = await profiles.find().toArray();
                res.send(profilesData);
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'An error occurred' });
            }
        });

        // Delete a profile
        app.delete('/deleteprofile/:userID', async (req, res) => {
            // Verify the token
            const token = req.header('Authorization').replace('Bearer ', '');
            try {
                const decoded = jwt.verify(token, secretKey);
                console.log('Decoded:', decoded);
            } catch (error) {
                console.error(error);
                return res.status(401).send({ message: 'Invalid token' });
            }
            // Delete the profile based on the userID passed in the endpoint
            const profile = await profiles.findOneAndDelete({ userID: req.params.userID });
            if (profile) {
                res.status(200).send({ message: 'Profile deleted' });
            } else {
                return res.status(404).send({ message: 'Profile not found' });
            }
        });

        // Modify a profile
        app.patch('/modifyprofile/:userID', async (req, res) => {
            // Verify the token
            const token = req.header('Authorization').replace('Bearer ', '');
            try {
                const decoded = jwt.verify(token, secretKey);
                console.log('Decoded:', decoded);
            } catch (error) {
                console.error(error);
                return res.status(401).send({ message: 'Invalid token' });
            }
            // Update the profile based on the userID passed in the endpoint and the changes specified in the request body
            const profile = await profiles.findOneAndUpdate({ userID: req.params.userID }, { $set: req.body });
            if (profile) {
                res.status(200).send({ message: 'Profile modified' });
            } else {
                return res.status(404).send({ message: 'Profile not found' });
            }
        });



        // Add a new job
        app.post('/addjob', async (req, res) => {
            // Verify the token
            const token = req.header('Authorization').replace('Bearer ', '');
            try {
                const decoded = jwt.verify(token, secretKey);
                console.log('Decoded:', decoded);
            } catch (error) {
                console.error(error);
                return res.status(401).send({ message: 'Invalid token' });
            }
            // Retrieve the user's credentials from the request body
            console.log(req.url);
            console.log(req.body);
            const { employerID, title, role_description, date_posted, date_deadline } = req.body;

            const numberholder = await jobs.findOne({ "Number": "Holder" });
            console.log(numberholder);

            let jobId = 0;
            if (typeof numberholder.jobId === "number") {
                jobId = numberholder.jobId + 1;
            } else if (typeof numberholder.jobId === "string") {
                jobId = parseInt(numberholder.jobId, 10) + 1;
            }

            const jobID = jobId;
            console.log(jobID);

            await collection.updateOne(
                { "Number": "Holder" },
                { $set: { "jobID": jobID } }
            );

            const myObj = {
                employerID: employerID,
                title: title,
                role_description: role_description,
                date_posted: date_posted,
                date_deadline: date_deadline,
                jobID: jobID
            };

            // Insert new job posting in database.
            await jobs.insertOne(myObj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });

            res.status(200).send({ myObj });
        });

        // Get list of all jobs
        app.get('/jobs', async (req, res) => {
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
                const jobsData = await jobs.find().toArray();
                res.send(jobsData);
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'An error occurred' });
            }
        });

        // Delete a job
        app.delete('/deletejob/:jobID', async (req, res) => {
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
            const jobID = req.params.jobID;
            console.log(req.params);
            try {
                const job = await jobs.findOne({ jobID: jobID });
                if (!job) {
                    return res.status(406).send({ message: 'Job not found' });
                }

                await jobs.deleteOne({ jobID: jobID });
                res.status(200).send({ message: 'Job successfully deleted' });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'An error occurred' });
            }
        });

        // Modify a job
        app.put('/modifyjob/:jobID', async (req, res) => {

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

            const jobID = req.params.jobID;
            console.log(req.params);
            console.log(req.body);
            const { employerID, title, role_description, date_posted, date_deadline } = req.body;
            try {
                const job = await jobs.findOne({ jobID: jobID });
                if (!job) {
                    return res.status(406).send({ message: 'Job not found' });
                }

                await jobs.updateOne({ jobID: jobID },
                    {
                        $set: {
                            employerID: employerID,
                            title: title,
                            role_description: role_description,
                            date_posted: date_posted,
                            date_deadline: date_deadline
                        }
                    });
                res.status(200).send({ message: 'Job successfully modified' });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'An error occurred' });
            }
        });

        // Add a new application
        app.post('/addapplication', async (req, res) => {
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

            // Retrieve the user's credentials from the request body
            console.log(req.url);
            console.log(req.body);
            const { date_applied, status, jobID, userID } = req.body;

            const myObj = {
                date_applied: date_applied,
                status: status,
                jobID: jobID,
                userID: userID
            };

            // Insert new job posting in database.
            await applications.insertOne(myObj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });

            res.status(200).send({ myObj });
        });

        // Get list of all applications
        app.get('/applications', async (req, res) => {
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
                const applicationsData = await applications.find().toArray();
                res.send(applicationsData);
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'An error occurred' });
            }
        });

        // Delete an application
        app.delete('/deleteapplication/:id', async (req, res) => {
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
                const id = req.params.id;
                const result = await applications.deleteOne({ _id: new ObjectID(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: 'Application not found' });
                }
                res.status(200).send({ message: 'Application deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'An error occurred' });
            }
        });

        // Update an application
        app.patch('/updateapplication/:id', async (req, res) => {
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
                const id = req.params.id;
                const updates = req.body;
                const result = await applications.updateOne({ _id: new ObjectID(id) }, { $set: updates });
                if (result.modifiedCount === 0) {
                    return res.status(404).send({ message: 'Application not found' });
                }
                res.status(200).send({ message: 'Application updated successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'An error occurred' });
            }
        });

        // In case need to verify token again.
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







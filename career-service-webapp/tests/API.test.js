process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const request = require('supertest');
//const { response } = require('../../api');
const app = request("https://sawongdomain.com");

describe('API test methods', () => 
{
    it('testing /testget', async() => 
    {
        const response = await app.get("/testget");
        expect(response.text).toEqual("Received request");
        expect(response.statusCode).toBe(200);
    });

    it('testing /testpost', async() => 
    {
        const response = await app.post("/testpost");
        expect(response.text).toEqual("Received request");
        expect(response.statusCode).toBe(200);
    });
});

describe('Student actions', () => 
{
    var token;

    it('testing /login', async() => 
    {
        let body = {"email": "testCandidate@gmail.com","password": "test","usertype": "student"};

        const response = await app.post("/login").send(body);
        token = response.body.accessToken;
        expect(response.statusCode).toBe(200);
    });

    it('testing /users', async() => 
    {
        const response = await app.get("/users").set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });

    it('testing /profiles', async() => 
    {
        const response = await app.get("/profiles").set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });

    it('testing /jobs', async() => 
    {
        const response = await app.get("/jobs").set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });

    it('testing /validate', async() => 
    {
        const response = await app.get("/validate").set('Authorization', token);
        expect(response.text).toEqual("Token still valid.");
        expect(response.statusCode).toBe(200);
    });
});

describe('Employer actions', () => 
{
    var token;

    it('testing /login', async() => 
    {
        let body = {"email": "testEmployer@gmail.com","password": "test","usertype": "employer"};

        const response = await app.post("/login").send(body);
        token = response.body.accessToken;
        expect(response.statusCode).toBe(200);
    });

    it('testing /users', async() => 
    {
        const response = await app.get("/users").set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });

    it('testing /profiles', async() => 
    {
        const response = await app.get("/profiles").set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });

    it('testing /jobs', async() => 
    {
        const response = await app.get("/jobs").set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });

    it('testing /validate', async() => 
    {
        const response = await app.get("/validate").set('Authorization', token);
        expect(response.text).toEqual("Token still valid.");
        expect(response.statusCode).toBe(200);
    });

    it('Scenario: create and delete posting', async() => 
    {
        let body = {"employerID": "49", "title": "TITLE", "role_description": "DESC", "date_posted": "TODAY", "date_deadline": "TOMORROW"};
        const addResponse = await app.post('/addjob').send(body).set('Authorization', token);
        expect(addResponse.statusCode).toBe(200);

        const response = await app.get('/jobs/49}').set('Authorization', token);
        var data = JSON.parse(response.text);
        var job = data.filter(function(r){return r["title"] === "TITLE"})[0]||'No record found';
        expect(job.title).toEqual("TITLE");
        expect(job.role_description).toEqual("DESC");
        expect(job.date_posted).toEqual("TODAY");
        expect(job.date_deadline).toEqual("TOMORROW");
        expect(response.statusCode).toBe(200);

        const delResponse = await app.delete(`/deletejob/${job.jobID}`).set('Authorization', token);
        expect(delResponse.statusCode).toBe(200);

        const response2 = await app.get('/jobs/49}').set('Authorization', token);
        data = JSON.parse(response2.text);
        job = data.filter(function(r){return r["title"] === "TITLE"})[0]||'No record found';
        expect(job).toEqual("No record found");
        expect(response2.statusCode).toBe(200);
    });
});

describe('Admin actions', () => 
{
    var token;

    it('testing /login', async() => 
    {
        let body = {"email": "testAdmin@gmail.com","password": "test","usertype": "admin"};

        const response = await app.post("/login").send(body);
        token = response.body.accessToken;
        expect(response.statusCode).toBe(200);
    });

    it('testing /users', async() => 
    {
        const response = await app.get("/users").set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });

    it('testing /profiles', async() => 
    {
        const response = await app.get("/profiles").set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });

    it('testing /jobs', async() => 
    {
        const response = await app.get("/jobs").set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });

    it('testing /validate', async() => 
    {
        const response = await app.get("/validate").set('Authorization', token);
        expect(response.text).toEqual("Token still valid.");
        expect(response.statusCode).toBe(200);
    });

    it('Scenario: user signs up and admin deletes them', async() => 
    {
        let body = {"name": "unitTestName", "email": "unitTest@gmail.com", "password": "test", "usertype": "student"};
        const singupResponse = await app.post('/signup').send(body);
        expect(singupResponse.statusCode).toBe(200);

        const response = await app.get('/users').set('Authorization', token);
        var data = JSON.parse(response.text);
        var user = data.filter(function(r){return r["email"] === "unitTest@gmail.com"})[0]||'No record found';
        expect(user.name).toEqual("unitTestName");
        expect(user.email).toEqual("unitTest@gmail.com");
        expect(user.password).toEqual("test");
        expect(user.usertype).toEqual("student");
        expect(response.statusCode).toBe(200);

        const delResponse = await app.delete(`/deleteuser/${user.id}`).set('Authorization', token);
        expect(delResponse.statusCode).toBe(200);

        const response2 = await app.get('/users').set('Authorization', token);
        data = JSON.parse(response2.text);
        user = data.filter(function(r){return r["email"] === "unitTest@gmail.com"})[0]||'No record found';
        expect(user).toEqual("No record found");
        expect(response2.statusCode).toBe(200);
    });
});
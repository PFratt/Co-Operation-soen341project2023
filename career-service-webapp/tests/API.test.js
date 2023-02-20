process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const request = require('supertest');
const app = request("https://sawongdomain.com");

describe('API test suite', () => 
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
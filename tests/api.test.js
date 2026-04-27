const request = require("supertest");
const app = require("../server");

describe("API Test", () => {

    test("GET / should return API info", async () => {

        const res = await request(app).get("/");

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Guild Management API");

    });

});
const request = require('supertest')
const app = require('../../app')

describe("Test Get /launches", () => {
    test("It should respond with 200 success", async () => {
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
    })
})

describe('Test Post /launch', () => {

    test("It should respond with 200 success", () => {
    })

    test("It should catch missing required properties", () => {})
    test("It should catch invalid dates", () => {})
})
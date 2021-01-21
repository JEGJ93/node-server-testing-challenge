const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('DBZ characters integration tests', () => {
    it("gets a list of characters", async () => {
        const res = await supertest(server).get("/api/dbz")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].name).toBe("goku")
    })
})

it("Get a DBZ character by ID", async () => {
    const res = await supertest(server).get("/api/dbz/2")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.id).toBe(2)
    expect(res.body.name).toBe("vegeta")
})

it("creates a new DBZ character", async () => {
    const res = await supertest(server)
    .post("/api/dbz")
    .send({ name: "krillin"})
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.id).toBeDefined()
})

it("Delete a DBZ Character", async () => {
    const res = await supertest(server).delete("/api/dbz/2")
    expect(res.type).toBe("application/json")
    expect(res.body.removed).toEqual(1)
})
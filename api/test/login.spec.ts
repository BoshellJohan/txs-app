import app from '../src/app.js';
import request from 'supertest';
import {dbConnect, dbDisconnect} from './globalSetup.js'

beforeAll(async() => dbConnect());
afterAll(async() => dbDisconnect());

describe('POST auth/login', () => {
    it("should register a new user", async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            email: "test@gmail.com",
            password: 'xxxx',
            name: "user name"
        });

        expect(res.status).toBe(200);
    })

    it("should allow access to an existent user", async () => {
        const res = await request(app)
        .post('/auth/login')
        .send({
            email: "test@gmail.com",
            password: 'xxxx'
        });

        expect(res.status).toBe(200);
        expect(res.body.user).toBeDefined();
    })

    it("should fail due to an invalid user", async () => {
        const res = await request(app)
        .post('/auth/login')
        .send({
            email: "dev@gmail.com",
            password: 'xxxx'
        });

        expect(res.status).toBe(401);
    })
})
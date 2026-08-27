// import request from 'supertest';
// import app from '../src/app.js';
// import {describe, expect, it, test} from '@jest/globals';
// import { UserModel } from '../src/models/user.model.js';
// import {dbConnect, dbDisconnect} from './globalSetup.js'

// beforeAll(async() => dbConnect());
// afterAll(async() => dbDisconnect());

// describe('POST auth/register', () => {
//     it("should register an user successfully", async () => {
//         const res = await request(app)
//         .post('/auth/register')
//         .send({
//             email: 'test@gmail.com',
//             password: '123456',
//             name: 'tester'
//         });

//         expect(res.status).toBe(200);
//         expect(res.body.user.email).toBe('test@gmail.com');
//         expect(res.body.accessToken).toBeDefined();
//         expect(res.body.refreshToken).toBeDefined();
//     })

//     it('should fail if email already exists', async () => {
//         const res = await request(app)
//         .post('/auth/register')
//         .send({
//             email: 'test@gmail.com',
//             password: 'xxxx',
//             name: "El tester"
//         });

//         expect(res.status).toBe(409);
//         expect(res.body.success).toBe(false);
//     })
// })
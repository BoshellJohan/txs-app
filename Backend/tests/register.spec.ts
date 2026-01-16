import request from 'supertest';
import app from '../src/app';
import {describe, expect, it, test} from '@jest/globals';

describe('POST auth/register', () => {
    it("should register an user successfully", async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            email: 'test@gmail.com',
            password: '123456'
        });

        expect(res.status).toBe(201);
        expect(res.body.user.email).toBe('test@gmail.com');
        expect(res.body.accessToken).toBeDefined();
        expect(res.body.refreshToken).toBeDefined();
    })

    it('should fail if email already exists', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            email: 'test@gmail.com',
            password: 'xxxx',
            name: "El tester"
        });

        expect(res.status).toBe(409);
        expect(res.body.success).toBe(false);
    })
})
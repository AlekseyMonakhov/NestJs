import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('auth system', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('it handles signup req', () => {
        const myemail = 'some123123@dmsmm.com';

        return request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email: myemail,
                password: '123321323',
            })
            .expect(201)
            .then((res) => {
                const { email, id } = res.body;

                expect(id).toBeDefined();
                expect(email).toEqual(myemail);
            });
    });

    it('signup as new user', async () => {
        const myemail = 'some123121234123412343@gmail.com';

        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email: myemail,
                password: '123456',
            })
            .expect(201);


        const cookie = res.get('Set-Cookie');

        const { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie)
            .expect(200);

        expect(body.email).toEqual(myemail);
    });
});

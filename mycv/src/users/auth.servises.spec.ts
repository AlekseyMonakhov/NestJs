import { Test } from '@nestjs/testing';
import { AuthService } from './auth.servise';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthServise', () => {
    let servise: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];

        fakeUserService = {
            find: (email: string) =>
                Promise.resolve(
                    users.filter((user) => user.email === user.email),
                ),

            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 9999999),
                    password,
                    email,
                } as User;
                users.push(user);
                return Promise.resolve(user);
            },
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
            ],
        }).compile();

        servise = module.get(AuthService);
    });

    it('can create instanse of auth servise', async () => {
        expect(servise).toBeDefined();
    });

    it('creates a new user with hashed and salted password', async () => {
        const user = await servise.signup('some@email.com', 'asdfasdfasd');

        expect(user.password).not.toEqual('123456');
        const [salt, hash] = user.password.split('.');

        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        await servise.signup('asdf@asdf.com', 'asdf');
        await expect(servise.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
            BadRequestException,
        );
    });

    it('throws if signin is called with an unused email', async () => {
        await expect(
            servise.signin('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        await servise.signup('laskdjf@alskdfj.com', 'password');
        await expect(
            servise.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
        ).rejects.toThrow(BadRequestException);
    });

    it('return user if correct password is provided', async () => {
        await servise.signup('asdf@asdf.com', 'laskdjf');

        const user = await servise.signin('asdf@asdf.com', 'laskdjf');
        expect(user).toBeDefined();
    });
});

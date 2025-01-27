import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of users service
    const users: User[] = [];
    fakeUsersService = {
      findOneByEmail: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'password');
    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws an error if user signs up with email that is in use', async () => {
<<<<<<< HEAD
    await service.signup('mason@hotmail.com', 'password');
    try {
      await service.signup('mason@hotmail.com', 'password');
    } catch (error) {
      console.log(error);
    }
    // fakeUsersService.findOneByEmail = () =>
    //   Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    // await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
    //   BadRequestException,
    // );
  });

  it('throws if an invalid password is provided', async (done) => {
    await service.signup('mason@hotmail.com', 'sgsgsd');
    try {
      await service.signin('mason@hotmail.com', 'password');
    } catch (error) {
      done();
    }
=======
    await service.signup('asdf@asdf.com', 'asdf');
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
>>>>>>> cc3afbe0a81fe23f35d314e8975570da80adea70
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('laskdjf@alskdfj.com', 'password');
    await expect(
      service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('ricky@hotmail.com', 'password');
    const user = await service.signin('ricky@hotmail.com', 'password');
    expect(user).toBeDefined();
  });
});

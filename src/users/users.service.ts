import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'adminuser@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      email: 'internuser@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'engineeruser1@example.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Daisy Miller',
      email: 'engineeruser2@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Eve Davis',
      email: 'adminuser2@example.com',
      role: 'ADMIN',
    },
  ];
  findAll(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User not found');
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with this id ${id} not found`);
    return user;
  }
  create(user: {
    name: string;
    email: string;
    role: 'ADMIN' | 'INTERN' | 'ENGINEER';
  }) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(
    id: number,
    updateUser: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'INTERN' | 'ENGINEER';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUser };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}

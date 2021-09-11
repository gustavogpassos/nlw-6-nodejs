import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

import { UsersRepositories } from "../repositories/UsersRespositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
  department: string;
  occupation: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password, department, occupation }: IUserRequest) {

    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Invalid email");
    }
    const userAlreadyExists = await usersRepository.findOne({
      email
    });
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const passwordHash = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    });
    await usersRepository.save(user);
    return user;
  }
}

export { CreateUserService };
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRespositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}


class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error("Email/Password icorrect");
    }
    //const passwwordMatch = 
    if (await compare(password, user.password)) {
      throw new Error("Email/Password icorrect");
    }

    const token = sign({
      email: user.email
    },
      "481d13d84cda1681e3519438862d03f1",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }

}

export { AuthenticateUserService }
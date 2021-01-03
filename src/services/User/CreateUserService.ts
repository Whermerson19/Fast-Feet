import User from "../../models/User";

import UsersRepository from "../../repositories/Users/UsersRepository";

import { hash } from "bcryptjs";

import { VerifyCredentials } from "../../utils/verifyCredentials";
import { getValidationCPF } from "../../utils/getValidationCPF";
import AppError from "../../utils/AppError";

interface IRequest {
  username: string;
  email: string;
  cpf: string;
  password: string;
  deliveryman: boolean;
}

export default class CreateUserService {
  public async init({
    username,
    email,
    password,
    cpf,
    deliveryman,
  }: IRequest): Promise<User> {
    const users_repositories = new UsersRepository();

    const checkedUsername = await users_repositories.findByUsername(username);
    const checkedEmail = await users_repositories.findByEmail(email);
    const checkedCPF = await users_repositories.findByCPF(cpf);

    VerifyCredentials({ checkedUsername, checkedEmail, checkedCPF });

    const hashPassword = await hash(password, 8);

    if (!getValidationCPF(cpf)) throw new AppError("Invalid cpf");

    const user = await users_repositories.create({
      username,
      email,
      cpf,
      password: hashPassword,
      deliveryman,
    });

    return user;
  }
}

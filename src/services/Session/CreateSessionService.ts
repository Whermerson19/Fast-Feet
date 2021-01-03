import User from "../../models/User";

import UsersRepository from "../../repositories/Users/UsersRepository";

import authConfig from "../../config/auth";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import AppError from '../../utils/AppError';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async init({ username, password }: IRequest): Promise<IResponse> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByUsername(username);
    if (!user) throw new AppError("Invalid USERNAME/PASSWORD");

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) throw new AppError("Invalid USERNAME/PASSWORD");

    const token = sign({ deliveryman: user.deliveryman }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

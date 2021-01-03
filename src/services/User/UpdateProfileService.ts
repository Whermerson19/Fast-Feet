// import {  } from 'typeorm';

import User from "../../models/User";

import UsersRepository from "../../repositories/Users/UsersRepository";

import { getValidationCPF } from "../../utils/getValidationCPF";
import AppError from "../../utils/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  id: string;
  email: string;
  username: string;
  cpf: string;

  current_password?: string;
  new_password?: string;
  confirm_password?: string;
}

export default class UpdateProfileService {
  public async init({
    id,
    email,
    username,
    cpf,
    current_password,
    new_password,
    confirm_password,
  }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const checkedUser = await usersRepository.findById(id);
    if (!checkedUser)
      throw new AppError(
        "You don't have authorization to perform this operation"
      );

    const checkedEmail = await usersRepository.findByEmail(email);
    const ckeckedUsername = await usersRepository.findByUsername(username);
    const ckeckedCPF = await usersRepository.findByCPF(cpf);

    if (!getValidationCPF(cpf)) throw new AppError("Invalid CPF");

    if (checkedEmail && email !== checkedUser.email)
      throw new AppError("This email is already in use");
    if (ckeckedUsername && username !== checkedUser.username)
      throw new AppError("This username is already in use");
    if (ckeckedCPF && cpf !== checkedUser.cpf)
      throw new AppError("This cpf is already in use");

    checkedUser.username = username;
    checkedUser.email = email;
    checkedUser.cpf = cpf;

    /* --------------------------------------------------- Change Password --------------------------------------------------------- */

    if (current_password && new_password && !confirm_password)
      throw new AppError("You must to confirm the new password");

    if (!current_password && new_password && confirm_password)
      throw new AppError("You must to inform the current password");

    if (current_password && new_password && confirm_password) {
      const checkedPassword = await compare(
        current_password,
        checkedUser.password
      );

      if (checkedPassword) {
        if (new_password === confirm_password) {
          const hashedPassoword = await hash(new_password, 8);
          checkedUser.password = hashedPassoword;
        } else {
          throw new AppError("Password don't match");
        }
      } else {
        throw new AppError("Invalid current password");
      }
    }

    return await usersRepository.save(checkedUser);
  }
}

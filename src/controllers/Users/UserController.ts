import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateUserService from "../../services/User/CreateUserService";
import UpdateProfileService from "../../services/User/UpdateProfileService";

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = new CreateUserService();

    const { username, email, cpf, password, deliveryman } = request.body;

    const user = await createUserService.init({
      username,
      email,
      cpf,
      password,
      deliveryman,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = new UpdateProfileService();

    const id = request.user.id;

    const {
      username,
      email,
      cpf,
      current_password,
      new_password,
      confirm_password,
    } = request.body;

    const user = await updateProfile.init({
      id,
      email,
      username,
      cpf,
      current_password,
      new_password,
      confirm_password,
    });

    return response.status(200).json(classToClass(user));
  }
}

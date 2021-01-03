import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateSessionService from "../../services/Session/CreateSessionService";

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
      const create_session = new CreateSessionService();

      const { username, password } = request.body;

      const data = await create_session.init({
        username,
        password
      });

      return response.json(classToClass(data));

  }
}

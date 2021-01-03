import { Router } from "express";
import { Joi, celebrate, Segments } from "celebrate";

import UserController from "../../controllers/Users/UserController";
import Authorization from "../../middlewares/Authorization";
import { getRepository } from "typeorm";
import User from "../../models/User";

const userRouter = Router();

const auth = new Authorization();

const userController = new UserController();

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().required(),
      password: Joi.string().min(6),
      deliveryman: Joi.boolean().required(),
    }),
  }),
  userController.create
);

userRouter.put("/", auth.allAuthorization, userController.update);

userRouter.get("/", async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return response.json(users);
});

export default userRouter;

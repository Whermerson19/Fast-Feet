import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import SessionController from "../../controllers/Session/SessionController";

const sessionRouter = Router();
const sessionController = new SessionController()

sessionRouter.post("/", celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}),sessionController.create);

export default sessionRouter;
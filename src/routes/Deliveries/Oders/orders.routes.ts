import { Router } from "express";

import multer from 'multer';
import uploadConfig from '../../../config/upload';

import OrdersController from "../../../controllers/Deliveries/Deliveryman/OrdersController";

import Authorization from "../../../middlewares/Authorization";

const ordersRouter = Router();

const upload = multer(uploadConfig);

const auth = new Authorization();

const ordersController = new OrdersController();

ordersRouter.patch(
  "/starter/:order_id",
  auth.deleverymanAuthorization,
  ordersController.start
);

ordersRouter.patch(
  "/finalize/:order_id",
  auth.deleverymanAuthorization,
  upload.single("signature_id"),
  ordersController.finalize
);

export default ordersRouter;

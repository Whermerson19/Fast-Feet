import { Router } from "express";
import multer from "multer";

import OrderController from "../../../controllers/Deliveries/Client/OrderController";
import uploadConfig from "../../../config/upload";
import Authorization from "../../../middlewares/Authorization";

const clientDeliveriesRouter = Router();

const auth = new Authorization();
const upload = multer(uploadConfig);

const orderController = new OrderController();

clientDeliveriesRouter.post(
  "/create/:deliveryman_id",
  auth.clientAuthorization,
  upload.single("signatureImage"),
  orderController.create
);

clientDeliveriesRouter.put(
  "/update/:order_id",
  auth.clientAuthorization,
  upload.single("signatureImage"),
  orderController.update
);

clientDeliveriesRouter.patch(
  "/cancel/:order_id",
  auth.clientAuthorization,
  orderController.delete
);

clientDeliveriesRouter.get(
  "/",
  auth.clientAuthorization,
  orderController.index
);

export default clientDeliveriesRouter;

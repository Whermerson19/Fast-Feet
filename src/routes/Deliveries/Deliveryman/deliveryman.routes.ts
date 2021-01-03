import { Router } from "express";

import Authorization from "../../../middlewares/Authorization";

import DeliverymanController from "../../../controllers/Deliveries/Deliveryman/DeliverymanController";
import OrdersController from "../../../controllers/Deliveries/Deliveryman/OrdersController";

const deliverymanRouter = Router();
const auth = new Authorization();

const deliverymanController = new DeliverymanController();
const orderController = new OrdersController();

deliverymanRouter.get(
  "/in-progress",
  auth.deleverymanAuthorization,
  deliverymanController.indexOrderInProgress
);

deliverymanRouter.get(
  "/completed",
  auth.deleverymanAuthorization,
  deliverymanController.indexCompletedOrders
);

deliverymanRouter.get(
  "/:order_id",
  auth.allAuthorization,
  orderController.index
);

export default deliverymanRouter;

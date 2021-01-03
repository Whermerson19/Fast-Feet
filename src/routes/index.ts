import { Router } from "express";

import userRouter from "./Users/user.routes";
import sessionRouter from "./Users/session.routes";

import clientDeliveriesRouter from "./Deliveries/Client/client.deliveries.routes";
import deliverymanRouter from "./Deliveries/Deliveryman/deliveryman.routes";

import ordersRouter from "./Deliveries/Oders/orders.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/sessions", sessionRouter);
appRouter.use("/client/deliveries", clientDeliveriesRouter);
appRouter.use("/deliveryman/deliveries", deliverymanRouter);
appRouter.use("/orders", ordersRouter);

export default appRouter;

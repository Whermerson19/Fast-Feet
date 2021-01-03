import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import ListOrderInProgressService from "../../../services/Deliveries/Deliveryman/ListOrderInProgressService";
import ListCompletedOrdersService from "../../../services/Deliveries/Deliveryman/ListCompletedOrdersService";

export default class DeliverymanController {
  public async indexOrderInProgress(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listOrderInProgress = new ListOrderInProgressService();

    const deliveryman_id = request.user.id;

    const orders = await listOrderInProgress.init({
      deliveryman_id,
    });

    return response.status(200).json(classToClass(orders));
  }

  public async indexCompletedOrders(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listCompletedOrders = new ListCompletedOrdersService();

    const deliveryman_id = request.user.id;

    const orders = await listCompletedOrders.init({
      deliveryman_id,
    });

    return response.status(200).json(classToClass(orders));
  }
}

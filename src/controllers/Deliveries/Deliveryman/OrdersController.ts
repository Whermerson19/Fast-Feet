import { Request, Response } from "express";

import StarterOrderService from "../../../services/Deliveries/Orders/StarterOrderService";
import FizalizeOrderService from "../../../services/Deliveries/Orders/FizalizeOrderService";

import ListEspecificOrderService from "../../../services/Deliveries/Deliveryman/ListEspecificOrderService";
import { classToClass } from "class-transformer";

export default class OrdersController {
  public async start(request: Request, response: Response): Promise<Response> {
    const startOrder = new StarterOrderService();

    const start_date = new Date(Date.now());
    const { order_id } = request.params;
    const deliveryman_id = request.user.id;

    const order = await startOrder.init({
      start_date,
      order_id,
      deliveryman_id,
    });

    return response.status(200).json(order);
  }

  public async finalize(
    request: Request,
    response: Response
  ): Promise<Response> {
    const finalizaOrder = new FizalizeOrderService();

    const end_date = new Date(Date.now());
    const { order_id } = request.params;
    const deliveryman_id = request.user.id;


    const order = await finalizaOrder.init({
      end_date,
      order_id,
      deliveryman_id,
    });

    return response.status(200).json(order);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listEspecificOrder = new ListEspecificOrderService();

    const { order_id } = request.params;
    const user_id = request.user.id;

    const order = await listEspecificOrder.init({
      order_id,
      user_id,
    });

    return response.status(200).json(classToClass(order));
  }
}

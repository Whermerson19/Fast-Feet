import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreateOrderService from "../../../services/Deliveries/Client/CreateOrderService";
import UpdateOrderService from "../../../services/Deliveries/Client/UpdateOrderService";
import RemoveOrderService from "../../../services/Deliveries/Client/CanceledOrderService";
import ListAllOrderFromClient from "../../../services/Deliveries/Client/ListAllOrderFromClient";

export default class OrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createOrderService = new CreateOrderService();

    const { deliveryman_id } = request.params;

    const client_id = request.user.id;

    const {
      product,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    } = request.body;


    const order = await createOrderService.init({
      deliveryman_id,
      product,
      address,
      neighborhood,
      city,
      state,
      postal_code,
      client_id,
    });

    return response.json(classToClass(order)).status(200);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateOrderService = new UpdateOrderService();

    const { order_id } = request.params;

    const client_id = request.user.id;

    const {
      deliveryman_id,
      product,
      address,
      postal_code,
      neighborhood,
      city,
      state,
    } = request.body;


    const order = await updateOrderService.init({
      order_id,
      deliveryman_id,
      product,
      address,
      postal_code,
      neighborhood,
      city,
      state,
      client_id,
    });

    return response.status(200).json(classToClass(order));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listOrderService = new ListAllOrderFromClient();

    const client_id = request.user.id;

    const list = await listOrderService.init({
      client_id,
    });

    return response.status(200).json(list);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const removeOrderService = new RemoveOrderService();

    const { order_id } = request.params;
    const canceled_date = new Date(Date.now());

    const order = await removeOrderService.init({
      order_id,
      canceled_date
    });

    return response.status(200).json(classToClass(order));
  }
}

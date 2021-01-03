import { getRepository } from "typeorm";

import Deliveries from "../../../models/Deliveries";

import UsersRepository from "../../../repositories/Users/UsersRepository";
import AppError from "../../../utils/AppError";

interface IRequest {
  start_date: Date;
  order_id: string;
  deliveryman_id: string;
}

export default class StarterOrderService {
  public async init({
    start_date,
    order_id,
    deliveryman_id,
  }: IRequest): Promise<Deliveries> {
    const deliveiresRepository = getRepository(Deliveries);
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(deliveryman_id);
    if (!user) throw new AppError("Invalid user");

    const order = await deliveiresRepository.findOne({
      where: {
        id: order_id,
      },
    });

    if (!order) throw new AppError("Ivalid order id");

    if (order.start_date) throw new AppError("This order is already running");
    if (order.end_date) throw new AppError("This order is already completed");

    order.start_date = start_date;

    await deliveiresRepository.save(order);

    return order;
  }
}

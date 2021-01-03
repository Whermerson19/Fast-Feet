import { getRepository } from "typeorm";

import Deliveries from "../../../models/Deliveries";

import StorageProvider from "../../../providers/StorageProvider";

import UsersRepository from "../../../repositories/Users/UsersRepository";
import AppError from "../../../utils/AppError";

interface IRequest {
  end_date: Date;
  order_id: string;
  deliveryman_id: string;
  signature_id: string;
}

export default class FizalizeOrderService {
  public async init({
    end_date,
    order_id,
    deliveryman_id,
    signature_id,
  }: IRequest): Promise<Deliveries> {
    const deliveiresRepository = getRepository(Deliveries);

    const usersRepository = new UsersRepository();
    const storageProvider = new StorageProvider();

    const user = await usersRepository.findById(deliveryman_id);
    if (!user) throw new AppError("Invalid user");

    const order = await deliveiresRepository.findOne({
      where: {
        id: order_id,
      },
    });

    if (!order) throw new AppError("Ivalid order id");

    if (!order.start_date)
      throw new AppError("you can't finish an uniniated order");
    if (order.end_date) throw new AppError("This order is already completed");
    if (order.canceled_at) throw new AppError("This order has been alceled");

    const file = await storageProvider.saveFile(signature_id);

    order.end_date = end_date;
    order.signature_id = file;

    await deliveiresRepository.save(order);

    return order;
  }
}

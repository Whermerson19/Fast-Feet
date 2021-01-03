import { getRepository } from "typeorm";

import Deliveries from "../../../models/Deliveries";

import UsersRepository from "../../../repositories/Users/UsersRepository";

import StorageProvider from "../../../providers/StorageProvider";
import AppError from "../../../utils/AppError";

interface IRequest {
  order_id: string;
  deliveryman_id: string;
  product: string;
  address: string;
  postal_code: string;
  neighborhood: string;
  city: string;
  state: string;
  client_id: string;
}

export default class UpdataOrderService {
  public async init({
    order_id,
    deliveryman_id,
    product,
    address,
    postal_code,
    neighborhood,
    city,
    state,
    client_id,
  }: IRequest): Promise<Deliveries> {
    const deliveriesRepository = getRepository(Deliveries);
    const usersRepository = new UsersRepository();
    const storageProvider = new StorageProvider();

    const user = await usersRepository.findById(client_id);
    if (!user) throw new AppError("Invalid User");

    const verifyOrder = await deliveriesRepository.findOne({
      where: {
        id: order_id,
      },
    });

    if (!verifyOrder) throw new AppError("Ivalid order id");
    if (verifyOrder.start_date || verifyOrder.canceled_at)
      throw new AppError("This order cannot be upgrade");

    verifyOrder.deliveryman_id = deliveryman_id;
    verifyOrder.product = product;
    verifyOrder.address = address;
    verifyOrder.postal_code = postal_code;
    verifyOrder.neighborhood = neighborhood;
    verifyOrder.city = city;
    verifyOrder.state = state;


    await deliveriesRepository.save(verifyOrder);

    return verifyOrder;
  }
}

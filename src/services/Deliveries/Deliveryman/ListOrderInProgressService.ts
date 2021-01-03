import { getRepository } from "typeorm";

import Deliveries from "../../../models/Deliveries";

import UsersRepository from "../../../repositories/Users/UsersRepository";
import AppError from "../../../utils/AppError";

interface IRequest {
  deliveryman_id: string;
}

export default class ListOrderInProgressService {
  public async init({ deliveryman_id }: IRequest): Promise<Deliveries[]> {
    const deliveriesRepository = getRepository(Deliveries);
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(deliveryman_id);
    if (!user) throw new AppError("Ivalid user");
    

    const list_orders = await deliveriesRepository.find({
      where: {
        deliveryman_id,
      },
    });

    const ordersFilter = list_orders.filter(curr => !curr.canceled_at && !curr.end_date)

    return ordersFilter;
  }
}

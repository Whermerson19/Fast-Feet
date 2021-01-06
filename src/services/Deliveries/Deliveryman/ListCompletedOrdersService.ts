import { getRepository } from "typeorm";

import Deliveries from "../../../models/Deliveries";

import UsersRepository from "../../../repositories/Users/UsersRepository";
import AppError from "../../../utils/AppError";

interface IRequest {
  deliveryman_id: string;
  filterNeighborhood?: string;
}

export default class ListCompletedOrderService {
  public async init({
    deliveryman_id,
    filterNeighborhood,
  }: IRequest): Promise<Deliveries[]> {
    const deliveriesRepository = getRepository(Deliveries);
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(deliveryman_id);
    if (!user) throw new AppError("Ivalid user");


    if (filterNeighborhood) {
      const list_orders = await deliveriesRepository.find({
        where: {
          deliveryman_id,
          neighborhood: filterNeighborhood,
        },
      });

    const ordersFilter = list_orders.filter((curr) => curr.end_date);

    return ordersFilter;
    }

    const list_orders = await deliveriesRepository.find({
      where: {
        deliveryman_id,
      },
    });

    const ordersFilter = list_orders.filter((curr) => curr.end_date);

    return ordersFilter;
  }
}

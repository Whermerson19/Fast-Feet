import { getRepository } from "typeorm";

import Deliveries from "../../../models/Deliveries";
import AppError from "../../../utils/AppError";

interface IRequest {
  order_id: string;
  canceled_date: Date;
}

export default class RemoveOrderService {
  public async init({
    order_id,
    canceled_date,
  }: IRequest): Promise<Deliveries> {
    const deliveriesRepository = getRepository(Deliveries);

    const checkedOrder = await deliveriesRepository.findOne({
      where: {
        id: order_id,
      },
    });

    if (!checkedOrder) throw new AppError("Invalid order id");
    if (checkedOrder.canceled_at)
      throw new AppError("This order has already been canceled");

    checkedOrder.canceled_at = canceled_date;

    await deliveriesRepository.save(checkedOrder);

    return checkedOrder;
  }
}

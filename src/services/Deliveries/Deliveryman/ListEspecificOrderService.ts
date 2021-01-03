import { getRepository } from 'typeorm';

import UsersRepository from '../../../repositories/Users/UsersRepository';
import Deliveries from '../../../models/Deliveries';
import AppError from '../../../utils/AppError';

interface IRequest {
  user_id: string;
  order_id: string;
}



export default class ListEspecificOrderController {
  public async init({user_id, order_id}: IRequest): Promise<Deliveries> {
    const usersRepository = new UsersRepository();
    const deliveriesRepository = getRepository(Deliveries);

    const user = await usersRepository.findById(user_id);

    if(!user) throw new AppError("Invalid user");

    const deliverie = await deliveriesRepository.findOne({
      where: {
        id: order_id
      }
    });

    if(!deliverie) throw new AppError("Invalid order_id")

    return deliverie;

  }
}
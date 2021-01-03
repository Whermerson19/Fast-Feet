import { getRepository } from "typeorm";
import Deliveries from "../../../models/Deliveries";

import UsersRepository from "../../../repositories/Users/UsersRepository";
import AppError from "../../../utils/AppError";

interface IRequest {
  client_id: string;
}

export default class ListAllOrderFromClient {
  public async init({client_id}: IRequest): Promise<Deliveries[]> {

    const deliveriesRepository = getRepository(Deliveries);
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(client_id);
    if(!user) throw new AppError("Invalid User");

    const deliveriesList = await deliveriesRepository.find({
      where: {
        client_id
      }
    });

    return deliveriesList;

  }
}

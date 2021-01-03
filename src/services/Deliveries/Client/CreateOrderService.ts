import { getRepository } from "typeorm";
import Deliveries from "../../../models/Deliveries";
import UsersRepository from '../../../repositories/Users/UsersRepository';

interface IRequest {
  deliveryman_id: string;
  product: string;
  address: string;
  postal_code: string;
  neighborhood: string;
  city: string;
  state: string;
  client_id: string;
}

export default class CreateOrderService {
  public async init({
    deliveryman_id,
    product,
    address,
    postal_code,
    neighborhood,
    city,
    state,
    client_id,
  }: IRequest): Promise<Deliveries> {
    const deliveriesRepositories = getRepository(Deliveries);
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(client_id);

    if(!user) throw new Error("invalid user")

    const order = deliveriesRepositories.create({
      deliveryman_id,
      product,
      address,
      postal_code,
      neighborhood,
      city,
      state,
      client_id
    });

    await deliveriesRepositories.save(order);

    return order;
  }
}

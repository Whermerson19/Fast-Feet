import User from "../../models/User";

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  cpf: string;
  deliveryman: boolean;
}

export default interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByCPF(cpf: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}

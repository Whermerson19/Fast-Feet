import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Exclude } from 'class-transformer';
import Deliveries from "./Deliveries";

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @OneToMany(() => Deliveries, deliveries => deliveries.deliveryman)
  deliveries: Deliveries[];

  @OneToMany(() => Deliveries, deliveries => deliveries.client)
  clients: Deliveries[];

  @Column()  
  cpf: string;

  @Column()
  email: string;

  @Column()
  user_image: string;

  @Column()
  @Exclude()
  password: string;

  @Column('boolean')
  deliveryman: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

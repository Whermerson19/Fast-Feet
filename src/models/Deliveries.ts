import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity("deliveries")
export default class Deliveries {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  deliveryman_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "deliveryman_id" })
  deliveryman: User;

  @Column()
  client_id: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: "client_id" })
  client: User;

  @Column()
  product: string;

  @Column()
  address: string;

  @Column()
  postal_code: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  signature_id: string;

  @CreateDateColumn()
  canceled_at: Date;

  @CreateDateColumn()
  start_date: Date;

  @CreateDateColumn()
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "packageStatus" })
  getPackageStatus(): string | null {
    return this.start_date ? (this.end_date ? "Entrege" : "Retirado") : "Aguardando"
  }
}

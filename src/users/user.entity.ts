import {
  Entity,
  AfterInsert,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with Id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Inserted User with Id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Inserted User with Id', this.id);
  }
}

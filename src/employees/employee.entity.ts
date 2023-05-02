import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn()
  image: string;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  about: string;
}

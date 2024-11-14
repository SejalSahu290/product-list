/* eslint-disable prettier/prettier */
import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
@PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;


 @Column()
 price:number;
 

 @CreateDateColumn()
 date:Date;

 @Column()
 quantity:number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(_type => User, user=> user.products, {eager: false})
  @Exclude({toPlainOnly: true})
  user: User;

}
/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
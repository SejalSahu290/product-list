/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Product } from '';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Use string for UUIDs

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.user, { eager: true })
  products: Product[]; // 
}

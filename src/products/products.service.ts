/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/auth/user.entity';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
// import { User } from 'src/auth/user.entity';

@Injectable()
export class ProductsService {
  @InjectRepository(Product)
  private productRepository: Repository<Product>

  // async getAllProducts(user: User): Promise<Product[]> {
  //   return await this.productRepository.find(
  //     where: { user},
  //   )};

  // async getAllProducts(user: User): Promise<Product[]> {
  //   return await this.productRepository.find({
  //     where: ({ user}), 
  //   });
  // }
  
  // async getAllProducts(filterDto : GetProductFilterDto ,user: User): Promise<Product[]> {

  //   const { search} = filterDto;
  //   const query = this.productRepository.createQueryBuilder('product')
  //   .leftJoinAndSelect('product')
  //   .where({user});

  //   // return await this.productRepository.find({
  //     // where: { user }, 
  //   // });
  // }

  async getAllProducts(filterDto: GetProductFilterDto, user: User): Promise<Product[]> {
    const { search } = filterDto;
  
    const query = this.productRepository.createQueryBuilder('product')
      .where('product.userId = :userId', { userId: user.id }); 
    
    if (search) {
      query.andWhere('product.name LIKE :search', { search: `%${search}%` }); 
    }
  
    return await query.getMany();
  }
  
  

  // async getProductById(id: number, user: User): Promise<Product> {
  //   const found = await this.productRepository.findOne({
  //     where: {id , user },
  //   });
  
  //   if (!found) {
  //     throw new NotFoundException(`Product with id "${id}" not found for the given user.`);
  //   }

  //   return found;
  // }

 

  async getProductById(id: number, userId: User): Promise<Product> {
    return await this.productRepository
      .createQueryBuilder('entity')
      .where('entity.id = :id', { id })
      .andWhere('entity.userId = :userId', { userId: userId.id })  
      .getOne();
  }
  


  async createProduct(createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product>{
    const {name , price ,  quantity} = createProductDto;

    const product = this.productRepository.create({
      name,
      price,
      user,
      quantity
    });
     await this.productRepository.save(product);
     return product;
  }


  async updateProduct(id: number, updateProductDto: UpdateProductDto, user: User): Promise<Product>{


    const { name , price  , quantity } = updateProductDto;
      
    // const product = await this.productRepository.findOne({ where: {id , user} });
    const product = await this.getProductById(id, user);

  
      product.name = name;
      product.price = price;
      // product.date = date;
      product.quantity = quantity;
       
  
      await this.productRepository.save(product);
  
      return product;
    }


  // async updateProduct(
  //   id: number, 
  //   updateProductDto: UpdateProductDto, 
  //   user: User
  // ): Promise<Product> {
  //   const { name, price, quantity } = updateProductDto;
  
  //   const product = await this.getProductById(id, user); 
   
  //   product.name = name;
  //   product.price = price;
  //   product.quantity = quantity;
  
  //   await this.productRepository.save(product);
  
  //   return product;
  // }
  


    async delete(id: number): Promise<void> {
      const result = await this.productRepository.delete(id);
      
      if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    }
  }



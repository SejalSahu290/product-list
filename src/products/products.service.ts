/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  @InjectRepository(Product)
  private productRepository: Repository<Product>

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product>{
 
     const found = await this.productRepository.findOne({
      where: { id },
    });


    return found;
  }

  
  async createProduct(createProductDto: CreateProductDto): Promise<Product>{
    const {name , price ,  quantity} = createProductDto;

    const product = this.productRepository.create({
      name,
      price,
      // date,
      quantity
    });
     await this.productRepository.save(product);
     return product;
  }


  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>{


    const { name , price , date , quantity } = updateProductDto;
      
    const product = await this.productRepository.findOne({ where: {id} });

  
      product.name = name;
      product.price = price;
      product.date = date;
      product.quantity = quantity;
       
  
      await this.productRepository.save(product);
  
      return product;
    }


    async delete(id: number): Promise<void> {
      const result = await this.productRepository.delete(id);
      
      if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    }
  }



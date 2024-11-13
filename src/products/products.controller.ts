/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param,  Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }


  @Get('/:id')
  getProductById(@Param('id') id: number): Promise<Product>{
      return this.productsService.getProductById(id);
  }


 @Post()
 async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
   return this.productsService.createProduct(createProductDto ); 
 }

  @Patch('/:id')
  async updateProduct(@Param('id') id: number,  @Body() updateProductDto: UpdateProductDto): Promise<Product>{
       return this.productsService.updateProduct(id, updateProductDto);
  }


  @Delete('/:id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    await this.productsService.delete(id);
  }
}

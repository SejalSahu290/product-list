/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param,  Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
// import { User } from 'src/auth/user.entity';
// import { GetUser } from 'src/auth/get-user.decorator';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @Get()
  async getAllProducts(@Query() filterDto: GetProductFilterDto, @GetUser() user:User): Promise<Product[]> {
    return await this.productsService.getAllProducts(filterDto ,user);
  }


  // @Get('/:id')
  // getProductById(@Param('id') id: number, @GetUser() user: User): Promise<Product>{
  //     return this.productsService.getProductById(id , user);
  // }

  @Get('/:id')
  async getProductById(
    @Param('id') id: number,
    @GetUser() user: User,  
  ): Promise<Product> {
    return this.productsService.getProductById(id, user);
  }

 @Post()
 async createProduct(@Body() createProductDto: CreateProductDto,
 @GetUser() user: User,
): Promise<Product> {
   return this.productsService.createProduct(createProductDto , user); 
 }

//   @Patch('/:id')
//   async updateProduct(@Param('id') id: number,  @Body() updateProductDto: UpdateProductDto,
//   @GetUser() user: User
// ): Promise<Product>{
//        return this.productsService.updateProduct(id, updateProductDto , user);
//   }

@Patch('/:id')
async updateProduct(
  @Param('id') id: number,  
  @Body() updateProductDto: UpdateProductDto,
  @GetUser() user: User
): Promise<Product> {
  return this.productsService.updateProduct(id, updateProductDto, user);
}



  @Delete('/:id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    await this.productsService.delete(id);
  }
}



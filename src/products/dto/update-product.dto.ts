/* eslint-disable prettier/prettier */
// import { PartialType } from '@nestjs/mapped-types';
// import { CreateProductDto } from './create-product.dto';




   
//     import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

// export class UpdateProductDto {
  
//   @IsNotEmpty()
//   @IsNumber()
//   id: number;

//   @IsOptional()
//   @IsString()
//   name?: string;

//   @IsOptional()
//   @IsNumber()
//   price?: number;

//   @IsOptional()
//   @IsDate()
//   date?: number;

//   @IsOptional()
//   @IsNumber()
//   quantity?: number;
// }



/* eslint-disable prettier/prettier */

 import { IsNumber,  IsString } from "class-validator";
 export class UpdateProductDto{

    //  @IsNotEmpty()
    //  @IsNumber()
    // id: number;
    
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    // @IsNumber()
    // @IsDate()
    // date?: Date;

     @IsNumber()
     quantity: number;

 }


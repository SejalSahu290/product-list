/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    price:number;

    // @IsNotEmpty()
    // date:Date;
     
    @IsNotEmpty()
    quantity:number;
}

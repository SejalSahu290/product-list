/* eslint-disable prettier/prettier */
import {  IsOptional, IsString } from "class-validator";

export class GetProductFilterDto{


    @IsOptional()
    @IsString()
    search?: string;
}
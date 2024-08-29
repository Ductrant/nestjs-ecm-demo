import { Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ResponseData } from 'src/common/response/ResponseData';
import { Paging } from 'src/common/response/Paging';

@Controller('product')
@ApiTags('Product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get('lists')
    async getListsProducts(
        @Req() request: Request
    )
    {
        const paging = {
            page: request.query.page || 1,
            page_size: request.query.page_size || 10,
        }

        const filters = {
            hot: request.query.hot || "",
            status: request.query.status || "",
            sort: request.query.sort || "",
            category_id: request.query.category_id || "",
        }

        const response = await this.productService.getListsProducts(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);
        
        return new ResponseData(HttpStatus.OK, data, "success", pagingData)
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.productService.show(id);
        return new ResponseData(HttpStatus.OK, data);
    }
}
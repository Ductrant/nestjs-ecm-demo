import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paging } from 'src/common/response/Paging';
import { ResponseData } from 'src/common/response/ResponseData';
import { Request } from 'express';
import { ProductService } from './product.service';
import CreateProductDto from './dto/CreateProduct.dto';
import UpdateProductDto from './dto/UpdateProduct.dto';

@Controller('cms/product')
@ApiTags('BE / Product')
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
        }

        const response = await this.productService.getListsProducts(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(HttpStatus.OK, data, "success", pagingData)
    }

    @Post('store')
    async store(
        @Body() productDto: CreateProductDto
    )
    {
        const data = await this.productService.store(productDto);
        return new ResponseData(HttpStatus.OK, data);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.productService.show(id);
        return new ResponseData(HttpStatus.OK, data);
    }

    @Put('update/:id')
    async update(
        @Body() productDto: UpdateProductDto,
        @Param('id') id: number
    )
    {
        const response = await this.productService.update(id, productDto);
        return new ResponseData(HttpStatus.OK, response);
    }
}

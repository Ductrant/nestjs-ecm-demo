import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CategoryService } from './category.service';
import { Paging } from 'src/common/response/Paging';
import { ResponseData } from 'src/common/response/ResponseData';

@Controller('category')
@ApiTags('Category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @Get('lists')
    async getListsCategory(
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
        }

        const response = await this.categoryService.getListsCategory(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);
        
        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.categoryService.show(id);
        return new ResponseData(HttpStatus.OK, data);
    }
}

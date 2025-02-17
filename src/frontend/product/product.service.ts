import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity from '../../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>

    async getListsProducts(paging: any, filters: any)
    {
        let condition: any = {};
        if (filters.hot) condition.pro_hot = filters.hot;
        if (filters.status) condition.pro_status = filters.status;
        if (filters.category_id) condition.pro_category_id = filters.category_id;

        let order: any = { id: "DESC" };
        if (filters.sort)
        {
            let arrSort: any = filters.sort.split(",");
            if (arrSort[0] && arrSort[1]) {
                let orderBy = arrSort[1] == "desc" ? "DESC" : "ASC";
                if (arrSort[0] == "pro_sale") {
                    order = {pro_sale: orderBy};
                }
            }
        }

        return await this.productRepository.findAndCount({
            where: condition,
            order: order,
            relations: {
                category: true
            },
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size,
        });
    }

    async show(id: number)
    {
        return await this.productRepository.findOne({
            where: {
                id: id
            }
        });
    }
}

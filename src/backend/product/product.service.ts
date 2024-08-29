import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProductEntity from '../../entities/product.entity';
import CreateProductDto from './dto/CreateProduct.dto';
import UpdateProductDto from './dto/UpdateProduct.dto';

@Injectable()
export class ProductService {

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>


    async getListsProducts(paging: any, filters: any)
    {
        let condition: any = {};
        if (filters.hot) condition.pro_hot = filters.hot;
        if (filters.status) condition.pro_status = filters.status;

        return await this.productRepository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size,
        });
    }

    async store(productDto: CreateProductDto)
    {
        const newData =  await this.productRepository.create(productDto);
        return await this.productRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.productRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, productDto: UpdateProductDto)
    {
        await this.productRepository.update(id, productDto);
        return await this.show(id);
    }
}

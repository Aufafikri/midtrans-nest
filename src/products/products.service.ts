import { Injectable } from '@nestjs/common';
import { PrismaService } from '../libs/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    public async createProduct(createProduct: CreateProductDto) {
       const product = await this.prisma.product.create({
            data: {
                ...createProduct
            }
        })

        console.log(product)
        
        return product
    }

    public async getAllProducts() {
        return this.prisma.product.findMany({})
    }
    
    public async getProductById(productId: string) {
        return this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })
    }
}

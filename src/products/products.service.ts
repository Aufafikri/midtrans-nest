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

       return product
    }

    public async getAllProducts() {
        return this.prisma.product.findMany({})
    }

    public async getPaginatedProducts (page: number, limit: number) {
        const skip = (page - 1) * limit
        console.log(`Fetching products - Page: ${page}, Limit: ${limit}, Skip: ${skip}`);
        const products = await this.prisma.product.findMany({
            skip,
            take: limit
        })

        const total = await this.prisma.product.count()

        const totalPages = Math.ceil(total / limit);

        console.log(`Total products: ${total}, Total Pages: ${totalPages}`);

        return {
            products,
            page,
            limit,
            total,
            totalPages
        }
    }
    
    public async getProductById(productId: string) {
        return this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })
    }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Get()
  // public async getAllProducts() {
  //   return this.productsService.getAllProducts()
  // }

  @Get()
  public async getPaginatedProducts (@Query('page') page: number = 1, @Query('limit') limit: number = 8) {
    return this.productsService.getPaginatedProducts(Number(page), Number(limit))
  }

  @Get('/:productId')
  public async getProductById(@Param('productId') productId: string ) {
    return this.productsService.getProductById(productId)
  }
  
  @Post()
  public async createProduct(@Body() createProduct: CreateProductDto ) {
    return this.productsService.createProduct(createProduct)
  }
}

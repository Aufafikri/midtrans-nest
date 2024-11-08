import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async getAllProducts() {
    return this.productsService.getAllProducts()
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

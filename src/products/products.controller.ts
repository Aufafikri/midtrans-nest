import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { MerchantAuthGuard } from 'src/auth/guards/merchant.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async getAllProducts() {
    return this.productsService.getAllProducts()
  }

  @Get('/paginate')
  public async getPaginatedProducts (@Query('page') page: number = 1, @Query('limit') limit: number = 8) {
    return this.productsService.getPaginatedProducts(Number(page), Number(limit))
  }

  @Get('/:productId')
  public async getProductById(@Param('productId') productId: string ) {
    return this.productsService.getProductById(productId)
  }

  @Get('/merchant/:merchantId')
  public async getProductsByMerchantId(@Param('merchantId') merchantId: string ) {
    return this.productsService.getProductByMerchantById(merchantId)
  }
  
  @Post()
  @UseGuards(MerchantAuthGuard)
  public async createProduct(@Body() createProduct: CreateProductDto ) {
    return this.productsService.createProduct(createProduct)
  
}

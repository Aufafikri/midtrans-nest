import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../libs/prisma.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, {
        provide: PrismaService,
        useValue: {
          product: {
            findMany: jest.fn()
          }
        }
      }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

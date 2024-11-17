import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../libs/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    product: {
      findMany: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, {
        provide: PrismaService, useValue: mockPrismaService
      }], 
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService)

  });

  afterEach(() => {
    jest.clearAllMocks()
  });

  it('should return all products', async () => {
    const mockProducts = [
      {
        id: "kasiajsoasoas",
        name: "kaos naga",
        price: 20000,
        description: "wkwkwk",
        image: "wkowko",
        userId: "askaoksao",
        createdAt: new Date('2024-01-01T00:00:00Z'),
        updatedAt: new Date('2024-01-02T00:00:00Z'),
      }
    ]

    jest.spyOn(prisma.product, 'findMany').mockResolvedValue(mockProducts)

    const result = await service.getAllProducts()

    expect(result).toEqual(mockProducts);
    expect(prisma.product.findMany).toHaveBeenCalledTimes(1)
  });
});

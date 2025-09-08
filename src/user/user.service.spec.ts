import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../libs/prisma.service';
import { MailsService } from '../mails/mails.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
            provide: MailsService,
            useValue: {
                sendEmail: jest.fn()
            },
        },
        {
            provide: CloudinaryService,
            useValue: {
                uploadImage: jest.fn()
            }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return a user by id', async () => {
    // arrange
    const userId = 'cm955v6vb0000409q3o6owzwd';
    const mockUser = { id: userId, name: 'John Doe' };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    // act
    const result = await service.getOneUserById(userId);

    // assert
    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });

  it('should return null if user not found', async () => {
    const userId = 'not-found';
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await service.getOneUserById(userId);

    expect(result).toBeNull();
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });
})
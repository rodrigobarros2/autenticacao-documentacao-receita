import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //cria um usuário no banco de dados
  async create(data) {
    const userExist = await this.prisma.user.findFirst({
      where: {
        userId: data.userId,
        username: data.username,
      },
    });

    if (userExist) {
      throw new Error('Usuário já cadastrado');
    }

    const userCreated = await this.prisma.user.create({ data });

    return userCreated;
  }

  //verifica se existe o usuário no banco de dados, e se existir retorna o token
  async findOne(username: string): Promise<User | undefined> {
    try {
      const usuario = await this.prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      return usuario;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }
}

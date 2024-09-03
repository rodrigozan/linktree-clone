import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

import IUser from "interfaces/IUser";

export class UserService {
  static async create(data: any): Promise<IUser | null> {
    const { name, username, email, password, celular, active, role } = data;
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const result: any = await prisma.$queryRaw`
      EXEC sp_lcms_create_user
          @name = ${name},
          @username = ${username},
          @email = ${email},  
          @password = ${hashedPassword},
          @celular = ${celular},
          @active = ${active},
          @role = ${role} 
    `;

    return result;
  }

  static async get() {
    const result: any = await prisma.$queryRaw`
        EXEC sp_lcms_select_users
    `;
    return result;
  }

  static async getById(id: number): Promise<IUser | null> {
    const result: any = await prisma.$queryRaw`
        EXEC sp_lcms_select_user @id = ${id}
    `;

    return result[0];
  }

  static async getOne(field: string): Promise<IUser | null> {
    if (!field) {
        return null;
    }

    const result: any = await prisma.$queryRaw`
        EXEC sp_lcms_search_users @field = ${field}
    `;

    return result[0];
}

  static async update(id: number, data: any): Promise<IUser | null> {
    const { name, username, email, password, celular, active, role } = data;
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const result: any = await prisma.$queryRaw`
        EXEC sp_lcms_update_user
            @id = ${id},
            @name = ${name},
            @username = ${username},
            @password = ${hashedPassword},
            @email = ${email},
            @celular = ${celular},
            @active = ${active},
            @role = ${role}
    `;

    return result[0]
  }

  static async delete(id: number): Promise<IUser | null> {
    const result: any = await prisma.$queryRaw`
        EXEC sp_lcms_delete_user @id = ${id}
    `;

    return result
  }  
}


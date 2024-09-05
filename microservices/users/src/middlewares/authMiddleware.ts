import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

import { UserService } from "../services/UserService";

const service  = UserService

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
}

export const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    (req as any).user = decoded;
    next()
  } catch (error) {
    return res.status(401).json(
      {
        name: error.name,
        message: 'Token inválido ou expirado - ' + error.message,
        stack: error.stack
      }
    );
  }
};


export const ownerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id; 
  const resourceId = req.params.id; 
  const resource = await service.getById(Number(resourceId));
  const role = resource?.role;

  try {
    if (role === 'admin') {
        return next();
      }    

    if (!resource) {
      return res.status(404).json({ message: 'Recurso não encontrado' });
    }

    if (resource.id !== userId) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    return next();
  } catch (error) {
    console.error('Erro ao verificar propriedade:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

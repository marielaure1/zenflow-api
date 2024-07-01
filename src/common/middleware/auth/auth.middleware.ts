import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';
import { FirebaseService } from '@providers/services/firebase/firebase.service';
import { log } from 'console';
import { SupabaseService } from '@providers/services/supabase/supabase.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly supabaseService: SupabaseService
  ) {}


  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid authentication token');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decodedToken = await this.supabaseService.verifyToken(token);
      req['user_firebase'] = decodedToken;
      
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
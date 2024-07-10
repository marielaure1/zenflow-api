import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';
// import { FirebaseService } from '@providers/services/firebase/firebase.service';
// import { log } from 'console';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { log } from 'console';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
  ) {}


  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid authentication token');
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decodedToken = await this.supabaseService.verifyToken(token);
      req['user_supabase'] = decodedToken;

      // const user = await this.usersService.findOneBySupabaseUid(decodedToken.id);
      // req['user'] = user;

      // const customer = await this.customersService.findOneByUser(user._id);
      // req['customer'] = customer;
      
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
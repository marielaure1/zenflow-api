import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseService } from '@providers/services/firebase/firebase.service';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';
import RoleEnum from '@enums/role.enum'; // Assurez-vous que le chemin est correct
import { ROLES_KEY } from '@decorators/roles.decorator'; // Assurez-vous que le chemin est correct
import { log } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authentication token');
    }

    const token = authHeader.split(' ')[1];
    

    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      request['firebase-user'] = decodedToken;

      const user = await this.usersService.findOneByFirebaseUid(decodedToken.uid);
      request['user'] = user;

      const customer = await this.customersService.findOneByUser(user._id);
      request['customer'] = customer;
      // const roles = this.reflector.get<RoleEnum[]>(ROLES_KEY, context.getHandler());
      // if (!roles) {
      //   return true;
      // }

      // const user = await this.usersService.findOneByFirebaseUid(decodedToken.uid);

      // console.log(roles);
      // console.log(user);
      
      // const userRole = user.role;
      // if (!this.hasRole(userRole, roles)) {
      //   throw new ForbiddenException('You do not have permission to access this resource');
      // }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private hasRole(userRole: RoleEnum, roles: RoleEnum[]): boolean {
    const roleHierarchy = {
      [RoleEnum.USER]: [RoleEnum.USER],
      [RoleEnum.ADMIN]: [RoleEnum.USER, RoleEnum.ADMIN],
      [RoleEnum.MEGAADMIN]: [RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.MEGAADMIN],
    };

    const allowedRoles = roleHierarchy[userRole] || [];
    return roles.some(role => allowedRoles.includes(role));
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { EUserRoles } from '../../users/enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user: any = request.user;

    const userRole = EUserRoles[`${user.role}`];

    const hasRole = () => roles.find((r) => r === userRole);

    if (user && user.role && hasRole()) return true;
    throw new ForbiddenException(
      `Korisnik ne posjeduje dovoljnu razinu privilegija.`,
    );
  }
}

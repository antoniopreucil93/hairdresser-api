import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, UserRegistrationDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  registerUser(@Body() userPayload: UserRegistrationDTO) {
    return this.service.registerUser(userPayload);
  }

  @Post('login')
  login(@Body() loginPayload: LoginDTO) {
    return this.service.login(loginPayload);
  }
}

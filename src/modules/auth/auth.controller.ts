import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Patch, 
    Delete, 
    Body,
    Param,
    Res,
    HttpStatus,
    HttpCode
  } from '@nestjs/common';
  import { AuthService } from '@modules/auth/auth.service';
  import { AuthUserTeamDto } from "@modules/auth/dto/auth-user-team.dto"
  import { AuthGuard } from '@modules/auth/guard/auth.guard';
  import { Public } from '@decorators/public.decorator';
  import { User } from '@modules/users/entities/user.entity'
  import { Model } from 'mongoose'
  import { UsersService } from '@modules/users/users.service';
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    // @Public()
    // @HttpCode(HttpStatus.OK)
    // @Post('login')
    // login(@Body() authDto: AuthDto) {
    //   return this.authService.login(authDto.email, authDto.password);
    // }
  
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register/:type')
    register(@Param('type') type: string, @Body() authUserTeamDto: AuthUserTeamDto) {
  
      return this.authService.register(authUserTeamDto, type);
    }
  
    // @HttpCode(HttpStatus.OK)
    // @Post('logout')
    // logout(@Body() authDto: AuthDto) {
    //   return this.authService.logout(authDto.email, authDto.password);
    // }
  
    // @UseGuards(AuthGuard)
    // @Get('profile')
    // getProfile(@Request() req: Model<User>) {
    //   return req;
    // }
  }
  
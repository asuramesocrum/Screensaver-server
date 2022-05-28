import {Body, Controller, Get, HttpStatus, Post, Req, Res, UsePipes, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateAuthDto} from "./dto/create.auth.dto";
import {LoginAuthDto} from "./dto/login.auth.dto";
import {Request, Response} from "express";
import {ValidationPipe} from "../../pipes/validation.pipe";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @Post(`/login`)
  async login(@Body() data: LoginAuthDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(data)

    return await AuthController.tokenTemplate(response, tokens)
  }

  @UsePipes(ValidationPipe)
  @Post(`/register`)
  async register(@Body() data: CreateAuthDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.register(data)

    return await AuthController.tokenTemplate(response, tokens)
  }

  @Get(`/refresh`)
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.refresh(request.cookies?.TokenRefreshScreensaver)

    return await AuthController.tokenTemplate(response, tokens)
  }

  @Get(`/logout`)
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const check = await this.authService.logout(request.cookies?.TokenRefreshScreensaver)
    response.clearCookie("TokenRefreshScreensaver")
    return check
  }

  private static async tokenTemplate(response: Response, tokens) {
    response.cookie("TokenRefreshScreensaver", tokens.tokenRefresh, {
      httpOnly: true,
      maxAge: 60 * 60 * 60 * 24 * 7, // 7d
    })
    return {
      accessToken: tokens.tokenAccess
    }
  }

}

import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../../../models/User";
import {JwtModule} from "@nestjs/jwt";
import {RoleModel} from "../../../models/Role";
import {TokenModel} from "../../../models/Token";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([UserModel, RoleModel, TokenModel]),
    JwtModule,
  ]
})
export class AuthModule {
}

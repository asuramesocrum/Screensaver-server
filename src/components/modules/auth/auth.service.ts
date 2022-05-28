import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "../../../models/User";
import {LoginAuthDto} from "./dto/login.auth.dto";
import {CreateAuthDto} from "./dto/create.auth.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {RoleModel} from "../../../models/Role";
import {TokenModel} from "../../../models/Token";

interface ITokens {
  tokenAccess: string,
  tokenRefresh: string
}

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    @InjectModel(RoleModel) private roleRepository: typeof RoleModel,
    @InjectModel(TokenModel) private tokenRepository: typeof TokenModel,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginAuthDto): Promise<ITokens> {
    const instance = await this.validUser(userDto.email, userDto.password)

    if (!instance) throw new HttpException("User is not found!", HttpStatus.BAD_REQUEST)

    const tokens = await this.tokenCreate({...instance, password: ""})

    const saved = await this.saveToken(instance.id, tokens.tokenRefresh)

    if (!saved) throw new HttpException("Token update error!", HttpStatus.INTERNAL_SERVER_ERROR)

    return {...tokens}
  }

  async register(userDto: CreateAuthDto): Promise<ITokens> {
    const instance = await this.createUser(userDto)
    if (!instance) throw new HttpException("Register error!", HttpStatus.SERVICE_UNAVAILABLE)

    const tokens = await this.tokenCreate({...instance, password: ""})

    const saved = await this.saveToken(instance.id, tokens.tokenRefresh)

    if (!saved) throw new HttpException("Token update error!", HttpStatus.INTERNAL_SERVER_ERROR)

    return {...tokens}
  }

  async refresh(token: string) {
    const check = await this.checkToken(token, "refresh")
    if (!check) throw new HttpException("Refresh token invalid!", HttpStatus.BAD_REQUEST)
    const tokens = await this.tokenCreate({...check, password: ""})
    const saved = await this.saveToken(check.id, tokens.tokenRefresh)
    if (!saved) throw new HttpException("Token update error!", HttpStatus.INTERNAL_SERVER_ERROR)
    return {...tokens}
  }

  async logout(token: string) {
    return await this.deleteToken(token)
  }

  private async checkToken(token: string, type: string = "access"): Promise<any> {
    if (type === "refresh") {
      const tokenData = await this.jwtService.verify(token, {
        secret: process.env.PRIVATE_KEY_REFRESH || "accesssdefultkey",
      })
      if (!tokenData) throw new HttpException("Token is valid!", HttpStatus.BAD_REQUEST)
      const tokenInstance = await this.tokenRepository.findOne({where: {userId: tokenData.id}})
      if (!tokenInstance) throw new HttpException("Token in db no exists!", HttpStatus.BAD_REQUEST)
      if (!await bcrypt.compare(token, tokenInstance.refreshToken)) throw  new HttpException("Refresh token invalid!", HttpStatus.BAD_REQUEST)
      return tokenData
    } else if (type === "access") {
      const tokenData = await this.jwtService.verify(token, {
        secret: process.env.PRIVATE_KEY_ACCESS || "accesssdefultkey",
      })
      if (!tokenData) throw new HttpException("Token is valid!", HttpStatus.BAD_REQUEST)
      return tokenData
    }
    return null
  }

  private async saveToken(userId: number, token: string) {
    const hashToken: string = await bcrypt.hash(token, 7)
    const tokenInstance = await this.tokenRepository.upsert({
      userId: userId,
      refreshToken: hashToken,
    })
    return tokenInstance
  }

  private async deleteToken(token: string) {
    const tokenData = await this.checkToken(token, "refresh")
    if (!tokenData) throw new HttpException("Refresh token invalid delete!", HttpStatus.BAD_REQUEST)

    const instance = await this.tokenRepository.destroy({
      where: {
        userId: tokenData.id
      }
    })

    return {
      message: "User is logout!"
    }
  }

  private async tokenCreate(user: CreateAuthDto) {
    const tokenAccess = await this.generateToken({...user}, "access")
    const tokenRefresh = await this.generateToken({...user}, "refresh")

    return {tokenAccess, tokenRefresh}
  }

  private async createUser(dto: CreateAuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email
      }
    })
    if (user) throw new HttpException("User already exist!", HttpStatus.BAD_REQUEST)

    let passHash = await bcrypt.hash(dto.password, 7)

    const userNew = await this.userRepository.create({...dto, password: passHash})

    await userNew.$set('roles', await this.getRole("USER"))

    return {
      id: userNew.id,
      email: userNew.email,
      first_name: userNew.first_name,
      last_name: userNew.last_name,
      sur_name: userNew.sur_name,
      roles: userNew.roles
    }
  }

  private async getRole(role: string) {
    const getRole = await this.roleRepository.findOne({
      where: {
        name: role
      }
    })
    if (!getRole) throw new HttpException("Role not found!", HttpStatus.BAD_REQUEST)
    return getRole
  }

  private async validUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email }
    })
    if (user && await bcrypt.compare(password, user.password)) {
      const {id, email, first_name, last_name, sur_name, roles} = user
      return {id, email, first_name, last_name, sur_name, roles}
    }
    throw new HttpException("Invalid user!", HttpStatus.BAD_REQUEST)
  }

  private async generateToken({id, email, first_name, last_name, sur_name, roles}: any, type: string): Promise<string> {

    let token;
    const payload = {id, email, first_name, last_name, sur_name, roles}

    if (type === "access") {
      token = this.jwtService.sign(payload, {
        secret: process.env.PRIVATE_KEY_ACCESS || "accesssdefultkey",
        expiresIn: process.env.ACCESS_TIME || "24h",
      });
    } else if (type === "refresh") {
      token = this.jwtService.sign(payload, {
        secret: process.env.PRIVATE_KEY_REFRESH || "accesssdefultkey",
        expiresIn: "7d",
      });
    } else {
      throw("Type is error.")
    }

    return token
  }

}

import {IsEmail, IsNotEmpty, Length} from "class-validator";


export class LoginAuthDto {

  @IsEmail({}, {message: "Неверный формат почты."})
  @IsNotEmpty({message: "Поле не может быть пустым."})
  readonly email: string

  @IsNotEmpty({message: "Поле не может быть пустым."})
  readonly password: string

}
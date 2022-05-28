import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";


export class CreateAuthDto {

  @IsEmail({}, {message: "Неверный формат почты."})
  @IsNotEmpty({message: "Поле не может быть пустым."})
  readonly email: string

  @IsNotEmpty({message: "Поле не может быть пустым."})
  readonly first_name: string

  @IsNotEmpty({message: "Поле не может быть пустым."})
  readonly last_name: string

  readonly sur_name: string

  @IsNotEmpty({message: "Поле не может быть пустым."})
  @Length(4, 32, {message: "Минимальная длина поля от 4 до 32"})
  readonly password: string

}
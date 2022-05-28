import {IsDefined, IsNotEmpty, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";


export class LessonElementDto {

  @IsNotEmpty({message: "Поле не может быть пустым."})
  position: number

  @IsNotEmpty({message: "Поле не может быть пустым."})
  startTime: string

  @IsNotEmpty({message: "Поле не может быть пустым."})
  endTime: string

  @IsNotEmpty({message: "Поле не может быть пустым."})
  teacher: string

  @IsNotEmpty({message: "Поле не может быть пустым."})
  cabinet: string

  @IsNotEmpty({message: "Поле не может быть пустым."})
  lesson: string

}


export class GroupElementDto {

  @IsNotEmpty({message: "Поле не может быть пустым."})
  group: string

  @ValidateNested({ each: true })
  @Type(() => LessonElementDto)
  lessons: LessonElementDto[]

}

export class TimetableDto {

  @IsNotEmpty({message: "Поле не может быть пустым."})
  date: string

  @IsNotEmpty({message: "Поле не может быть пустым."})
  authorId: number

  @IsNotEmpty({message: "Поле не может быть пустым."})
  @ValidateNested({ each: true })
  @Type(() => GroupElementDto)
  dataConstructor: GroupElementDto[]

}
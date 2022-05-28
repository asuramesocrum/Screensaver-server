import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import { TimetableService } from './timetable.service';
import {TimetableDto} from "./dto/timetable.dto";
import {ValidationPipe} from "../../pipes/validation.pipe";

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createTimeTable(@Body() data: TimetableDto) {
    return await this.timetableService.addTimetable(data)
  }


}

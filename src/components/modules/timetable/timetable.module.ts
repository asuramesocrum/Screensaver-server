import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {TimetableModel} from "../../../models/Timetable";

@Module({
  controllers: [TimetableController],
  providers: [TimetableService],
  imports: [
    SequelizeModule.forFeature([TimetableModel]),
  ]
})
export class TimetableModule {}

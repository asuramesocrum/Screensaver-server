import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TimetableModel} from "../../../models/Timetable";
import {TimetableDto} from "./dto/timetable.dto";

@Injectable()
export class TimetableService {

  constructor(
    @InjectModel(TimetableModel) private timetableRepository: typeof TimetableModel
  ) {
  }

  async addTimetable({dataConstructor ,...data}: TimetableDto) {
    console.log({...data, dataConstructor: JSON.stringify(dataConstructor)})
    return await this.timetableRepository.create({...data, dataConstructor: JSON.stringify(dataConstructor)})
  }


}

import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ClubModel} from "../../../models/Club";

@Module({
  controllers: [ClubController],
  providers: [ClubService],
  imports: [
    SequelizeModule.forFeature([ClubModel]),
  ]
})
export class ClubModule {}

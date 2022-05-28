import { Injectable } from '@nestjs/common';
import {ClubModel} from "../../../models/Club";
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "../../../models/User";
import {LinkModel} from "../../../models/Link";
import {GalleryModel} from "../../../models/Gallery";

@Injectable()
export class ClubService {

  constructor(
    @InjectModel(ClubModel) private clubRepository: typeof ClubModel
  ) {}

  async findAll() {
    return await this.clubRepository.findAll({
      include: [
        {
          model: UserModel,
          attributes: {exclude: ["password", "status", "createdAt", "updatedAt"]},
        },
        {
          model: LinkModel,
          attributes: {exclude: ["createdAt", "updatedAt"]},
        },
        {
          model: GalleryModel,
          attributes: {exclude: ["createdAt", "updatedAt"]},
        },
      ]
    })
  }

}

import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {LinkModel} from "../Link";
import {ClubModel} from "../Club";
import {GalleryModel} from "../Gallery";

@Table({
  tableName: 'club_on_gallery',
  timestamps: false,
})
export class ClubOnGalleryModel extends Model<ClubOnGalleryModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ForeignKey(() => ClubModel)
  @Column({
    unique: false,
  })
  clubId: number

  @ForeignKey(() => GalleryModel)
  @Column({
    unique: false,
  })
  galleryId: number
}
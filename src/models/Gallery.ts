import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "./User";
import {UserOnRoleModel} from "./ManyToMany/UserOnRole";
import {ClubOnGalleryModel} from "./ManyToMany/ClubOnGallery";
import {ClubModel} from "./Club";


@Table({
  tableName: 'galleries',
  timestamps: false
})
export class GalleryModel extends Model<GalleryModel> {

  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  path: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string

  @ForeignKey(() => UserModel)
  @Column({allowNull: true, unique: false})
  authorId: number

  @BelongsTo(() => UserModel)
  author: UserModel

  @BelongsToMany(() => ClubModel, () => ClubOnGalleryModel)
  clubs: ClubModel[]
}
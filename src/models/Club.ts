import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "./User";
import {UserOnRoleModel} from "./ManyToMany/UserOnRole";
import {ClubOnLinkModel} from "./ManyToMany/ClubOnLink";
import {LinkModel} from "./Link";
import {RoleModel} from "./Role";
import {GalleryModel} from "./Gallery";
import {ClubOnGalleryModel} from "./ManyToMany/ClubOnGallery";


@Table({
  tableName: 'clubs',
})
export class ClubModel extends Model<ClubModel> {

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
  name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string

  @ForeignKey(() => UserModel)
  @Column({allowNull: false, unique: false})
  curatorId: number

  @BelongsTo(() => UserModel)
  curator: UserModel

  @BelongsToMany(() => LinkModel, () => ClubOnLinkModel)
  links: LinkModel[]

  @BelongsToMany(() => GalleryModel, () => ClubOnGalleryModel, "galleryId")
  galleries: GalleryModel[]
}
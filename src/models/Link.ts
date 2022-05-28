import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "./User";
import {UserOnRoleModel} from "./ManyToMany/UserOnRole";
import {ClubModel} from "./Club";
import {ClubOnLinkModel} from "./ManyToMany/ClubOnLink";


@Table({
  tableName: 'links',
})
export class LinkModel extends Model<LinkModel> {

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
  href: string

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

  @BelongsToMany(() => ClubModel, () => ClubOnLinkModel)
  clubs: ClubModel[]
}
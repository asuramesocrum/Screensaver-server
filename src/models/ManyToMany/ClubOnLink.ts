import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {LinkModel} from "../Link";
import {ClubModel} from "../Club";

@Table({
  tableName: 'club_on_link',
  timestamps: false,
})
export class ClubOnLinkModel extends Model<ClubOnLinkModel> {
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
    allowNull: false,
  })
  clubId: number

  @ForeignKey(() => LinkModel)
  @Column({
    unique: true,
    allowNull: false,
  })
  linkId: number
}
import {Column, DataType, Model, Table} from "sequelize-typescript";


@Table({
  tableName: 'groups',
  timestamps: false
})
export class GroupModel extends Model<GroupModel> {

  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  code: string
}
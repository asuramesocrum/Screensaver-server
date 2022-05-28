import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "./User";

@Table({
  tableName: 'timetables',
})
export class TimetableModel extends Model<TimetableModel> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.DATEONLY, unique: true, allowNull: false })
  date: string

  @ForeignKey(() => UserModel)
  @Column({allowNull: false, unique: false})
  authorId: number

  @BelongsTo(() => UserModel)
  author: UserModel

  @Column({ type: DataType.TEXT, allowNull: false })
  dataConstructor: string

}
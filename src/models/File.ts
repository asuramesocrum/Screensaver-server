import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "./User";


@Table({
  tableName: 'files',
})
export class FileModel extends Model<FileModel> {

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
  path: string

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
  })
  authorId: number
}
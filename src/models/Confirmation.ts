import {Column, DataType, Default, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "./User";


@Table({
  tableName: 'confirmations',
})
export class ConfirmationModel extends Model<ConfirmationModel> {

  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ForeignKey(() => UserModel)
  @Column({allowNull: false, unique: true})
  userId: number

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  email: boolean

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  emailCode: string
}
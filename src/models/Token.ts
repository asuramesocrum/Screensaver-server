import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {UserModel} from "./User";


@Table({
  tableName: 'tokens',
})
export class TokenModel extends Model<TokenModel> {

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

  @BelongsTo(() => UserModel)
  user: UserModel

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  refreshToken: string

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  devToken: string

}
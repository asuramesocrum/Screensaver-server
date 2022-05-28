import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UserModel} from "../User";
import {RoleModel} from "../Role";

@Table({
  tableName: 'user_on_role',
  timestamps: false,
})
export class UserOnRoleModel extends Model<UserOnRoleModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ForeignKey(() => UserModel)
  @Column({
    unique: false,
  })
  userId: number

  @ForeignKey(() => RoleModel)
  @Column({
    unique: true,
  })
  roleId: number
}
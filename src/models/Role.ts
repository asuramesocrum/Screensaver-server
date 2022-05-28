import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {UserModel} from "./User";
import {UserOnRoleModel} from "./ManyToMany/UserOnRole";


@Table({
  tableName: 'roles',
  timestamps: false
})
export class RoleModel extends Model<RoleModel> {

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

  @BelongsToMany(() => UserModel, () => UserOnRoleModel)
  users: UserModel[]

}
import {BelongsToMany, Column, DataType, Default, Model, Table} from "sequelize-typescript";
import {UserOnRoleModel} from "./ManyToMany/UserOnRole";
import {RoleModel} from "./Role";


@Table({
  tableName: 'users'
})
export class UserModel extends Model<UserModel> {

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
  email: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  sur_name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string

  @Default("ACTIVE")
  @Column({
    type: DataType.ENUM("ACTIVE", "BLOCKED", "INFINITY"),
    allowNull: false,
  })
  status: "ACTIVE" | "BLOCKED" | "INFINITY"

  @BelongsToMany(() => RoleModel, () => UserOnRoleModel)
  roles: RoleModel[]
}

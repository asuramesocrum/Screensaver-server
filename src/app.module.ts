import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import ModelController from "./models/_main";
import {AuthModule} from "./components/modules/auth/auth.module";
import {ClubModule} from "./components/modules/club/club.module";
import {TimetableModule} from "./components/modules/timetable/timetable.module";


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      models: ModelController.getAll(),
    }),
    AuthModule,
    ClubModule,
    TimetableModule,
  ],
})
export class AppModule {}

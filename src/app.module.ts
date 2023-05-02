import { Module } from '@nestjs/common';
import { ParserModule } from './parser/parser.module';
import { EmployeesModule } from './employees/employees.module';
import { Config, configSchema } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/employee.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<Config, true>) => ({
        type: 'postgres',
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        host: configService.get('DATABASE_HOST'),
        entities: [Employee],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ParserModule,
    EmployeesModule,
  ],
})
export class AppModule {}

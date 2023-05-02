import { Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [EmployeesModule],
  providers: [ParserService],
})
export class ParserModule {}

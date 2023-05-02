import { Controller, Get, Query } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';
import { GetAllEmployeesQueryDTO } from './dto/GetAllEmployeesQueryDTO';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getAll(@Query() filter: GetAllEmployeesQueryDTO): Promise<Employee[]> {
    return this.employeesService.getAll(filter);
  }
}

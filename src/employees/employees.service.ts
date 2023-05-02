import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  async getAll(filter: Partial<Employee>): Promise<Employee[]> {
    return this.employeesRepository.find({ where: filter });
  }

  async createMany(candidates: Employee[]): Promise<Employee[]> {
    const employees = this.employeesRepository.create(candidates);
    await this.employeesRepository.save(employees);
    return employees;
  }
}

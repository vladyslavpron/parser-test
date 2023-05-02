import { IsString, IsOptional } from 'class-validator';

export class GetAllEmployeesQueryDTO {
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  about?: string;
}

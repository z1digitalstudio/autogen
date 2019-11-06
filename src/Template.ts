import { IsString } from 'class-validator';

export class Template {
  @IsString({ each: true })
  dependencies!: string[];
  @IsString()
  templateFile!: string;
  transformData?: (files: string[]) => unknown;
}

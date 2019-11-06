import { IsOptional, IsString, ValidateNested } from 'class-validator';
import Handlebars from 'handlebars';
import { Template } from './Template';

export class Config {
  @IsString()
  baseDir!: string;
  @IsOptional()
  configureHandlebars?: (hbs: typeof Handlebars) => void;
  @ValidateNested({ each: true })
  templates!: Template[];
}

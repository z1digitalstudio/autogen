import { validate } from 'class-validator';
import { join } from 'path';
import { Config } from './Config';
import { Template } from './Template';

export const readConfig = async () => {
  const config: Config = Object.assign(
    Object.create(Config.prototype),
    require(join(process.cwd(), './autogen.config')),
  );

  if (config.templates && Array.isArray(config.templates)) {
    config.templates = config.templates.map(template =>
      Object.assign(Object.create(Template.prototype), template),
    );
  }

  const errors = await validate(config, { validationError: { target: false } });

  if (errors.length > 0) {
    console.error('Invalid config!\n');
    errors.forEach(error => console.error(JSON.stringify(error, null, 2)));
    process.exit(1);
  }

  return config;
};

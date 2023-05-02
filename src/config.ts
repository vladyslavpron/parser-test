import Joi, { ObjectPropertiesSchema } from 'joi';

export interface Config {
  PORT: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
}

type TargetType = { [k in keyof Config]-?: ObjectPropertiesSchema<Config[k]> };

const schema: TargetType = {
  PORT: Joi.string().default('3000'),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
};

export const configSchema = Joi.object(schema);

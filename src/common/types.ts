import { ValidationSchema } from 'fastest-validator';

export type EndpointParameterSources = 'params' | 'query' | 'body';
export type ValidationParamsSchema = {
  [key in EndpointParameterSources]?: ValidationSchema;
};

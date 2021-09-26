import Validator, { ValidationError } from 'fastest-validator';
import Koa from 'koa';
import { ClientError } from '../common/errors';
import { ValidationParamsSchema, EndpointParameterSources } from '../common/types';

const PARAMETER_SOURCES: EndpointParameterSources[] = [
  'params',
  'query',
  'body',
];

const validator = new Validator();

export default (schema: ValidationParamsSchema) => async (
  ctx: Koa.Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  const validationErrorsObject: {
    [key in EndpointParameterSources]: Array<ValidationError>;
  } = {
    params: [],
    query: [],
    body: [],
  };

  // validate input params and fill 'validationErrorsObject' (if validation errors occurred)
  await Promise.all(
    PARAMETER_SOURCES.map(async (paramsSrc: EndpointParameterSources) => {
      const concreteSchema = schema[paramsSrc];
      const concreteParams = paramsSrc === 'body' ? ctx.request.body : ctx[paramsSrc];

      if (concreteSchema) {
        const check = validator.compile(concreteSchema);
        const validationResult = await check(concreteParams);

        if (validationResult === true) {
          return;
        }

        validationErrorsObject[paramsSrc].push(...validationResult);
      }
    }),
  );

  // throw error if validation errors are found
  if (
    Object.values(validationErrorsObject).some(
      (validationErrors) => validationErrors.length,
    )
  ) {
    throw new ClientError('Validation Error', 400, validationErrorsObject);
  }

  await next();
};

/* eslint-disable max-classes-per-file */

import {
  Schema,
  getSchema,
  Array,
  Number,
  String,
} from 'fastest-validator-decorators';

@Schema(true)
export class GetAuthorsListParams {
  @Number({
    optional: true,
    default: 1,
    integer: true,
    convert: true,
    positive: true,
  })
  page!: number;

  @Number({
    optional: true,
    default: 10,
    integer: true,
    convert: true,
    positive: true,
  })
  pageSize!: number;
}

@Schema(true)
export class GetAuthorByIdParams {
  @Number({
    optional: false,
    integer: true,
    convert: true,
    positive: true,
  })
  authorId!: number;
}

@Schema(true)
export class CreateAuthorParams {
  @String({ optional: true, empty: false })
  name?: string | null;

  @String({ optional: true, empty: false })
  secondName?: string | null;

  @String({ optional: true, empty: false })
  patronymic?: string | null;
}

@Schema(true)
export class SetBooksParams {
  @Number({
    optional: false,
    integer: true,
    convert: true,
    positive: true,
  })
  authorId!: number;

  @Array({
    optional: false,
    items: {
      type: 'number',
      integer: true,
      convert: true,
      positive: true,
    },
  })
  bookIds!: number[];
}

@Schema(true)
export class DeleteAuthorByIdParams {
  @Number({
    optional: false,
    integer: true,
    convert: true,
    positive: true,
  })
  authorId!: number;
}

@Schema(true)
export class UpdateAuthorByIdParams {
  @Number({
    optional: false,
    integer: true,
    convert: true,
    positive: true,
  })
  authorId!: number;
}

@Schema(true)
export class UpdateAuthorByIdBodyParams {
  @String({ optional: true, empty: false })
  name?: string | null;

  @String({ optional: true, empty: false })
  secondName?: string | null;

  @String({ optional: true, empty: false })
  patronymic?: string | null;
}

export default {
  getAuthorsList: { query: getSchema(GetAuthorsListParams) },
  getAuthorById: { params: getSchema(GetAuthorByIdParams) },
  createAuthor: { body: getSchema(CreateAuthorParams) },
  setBooks: { body: getSchema(SetBooksParams) },
  deleteAuthorById: { params: getSchema(DeleteAuthorByIdParams) },
  updateAuthorById: {
    params: getSchema(UpdateAuthorByIdParams),
    body: getSchema(UpdateAuthorByIdBodyParams),
  },
};

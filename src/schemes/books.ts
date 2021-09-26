/* eslint-disable max-classes-per-file */

import {
  Schema,
  getSchema,
  Array,
  String,
  Number,
} from 'fastest-validator-decorators';

@Schema(true)
export class GetBooksListParams {
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
export class GetBookByIdParams {
  @Number({
    optional: false,
    integer: true,
    convert: true,
    positive: true,
  })
  bookId!: number;
}

@Schema(true)
export class CreateBookParams {
  @String({ optional: true, empty: false })
  title?: string | null;

  @String({ optional: true, empty: false })
  annotation?: string | null;
}

@Schema(true)
export class SetAuthorsParams {
  @Number({
    optional: false,
    integer: true,
    convert: true,
    positive: true,
  })
  bookId!: number;

  @Array({
    optional: false,
    items: {
      type: 'number',
      integer: true,
      convert: true,
      positive: true,
    },
  })
  authorIds!: number[];
}

@Schema(true)
export class DeleteBookByIdParams {
  @Number({
    optional: false,
    integer: true,
    convert: true,
    positive: true,
  })
  bookId!: number;
}

@Schema(true)
export class UpdateBookByIdParams {
  @Number({
    optional: false,
    integer: true,
    convert: true,
    positive: true,
  })
  bookId!: number;
}

@Schema(true)
export class UpdateBookByIdBodyParams {
  @String({ optional: true, empty: false })
  title?: string | null;

  @String({ optional: true, empty: false })
  annotation?: string | null;
}

export default {
  getBooksList: { query: getSchema(GetBooksListParams) },
  getBookById: { params: getSchema(GetBookByIdParams) },
  createBook: { body: getSchema(CreateBookParams) },
  setAuthors: { body: getSchema(SetAuthorsParams) },
  deleteBookById: { params: getSchema(DeleteBookByIdParams) },
  updateBookById: {
    params: getSchema(UpdateBookByIdParams),
    body: getSchema(UpdateBookByIdBodyParams),
  },
};

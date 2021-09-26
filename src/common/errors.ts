/* eslint-disable max-classes-per-file */

export class ClientError extends Error {
  status: number;

  data: { [type: string]: unknown };

  constructor(message = 'Bad Request', status = 400, data = {}) {
    super(message);
    this.status = status;
    this.name = 'ClientError';
    this.data = data;
  }
}

export class InternalServerError extends Error {
  status: number;

  constructor(message = 'Internal Server Error', status = 500) {
    super(message);
    this.status = status;
    this.name = 'InternalServerError';
  }
}

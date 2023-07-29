export class UnprocessableError extends Error {
  constructor(message = 'Unprocessable Entity') {
    super(message);
    Object.setPrototypeOf(this, UnprocessableError.prototype);
  }
}

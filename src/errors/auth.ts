export class AuthError extends Error {
  constructor(message = 'Authentication error') {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

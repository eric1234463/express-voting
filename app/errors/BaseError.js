class BaseError {
  constructor(error) {
    this.error = error
  }

  static createError(error) {
    return new BaseError(error);
  }

  get statusCode() {
    return 400;
  }

  get message() {
    return this.error
  }
}

module.exports = BaseError;

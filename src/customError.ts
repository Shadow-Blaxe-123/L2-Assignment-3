class GenericError extends Error {
  public statusCode: number;
  public message: string;
  public err: unknown;
  public name: string;
  constructor(
    message: string,
    statusCode: number,
    name: string,
    err?: unknown
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.err = err;

    // Required when extending built-ins like Error in TypeScript
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
  errormsg() {
    return {
      message: this.message,
      success: false,
      error: this.err,
    };
  }
}

export default GenericError;

class GenericError extends Error {
  public statusCode: number;
  public message: string;
  constructor(message: string, statusCode: number, name: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;

    // Required when extending built-ins like Error in TypeScript
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
  errormsg(err: unknown) {
    return {
      message: this.message,
      success: false,
      error: err,
    };
  }
}

export default GenericError;

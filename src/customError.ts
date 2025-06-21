class GenericError extends Error {
  public statusCode: number;
  public message: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
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

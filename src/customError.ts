class GenericError extends Error {
  constructor(message: string, public statusCode: number = 404) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default GenericError;

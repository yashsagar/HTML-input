export class CustomError extends Error {
  constructor(error = {}) {
    const { message = "somthing went wrong", ...rest } = error;
    super(message);
    this.name = "customError";
    if (Object.keys(rest).length > 0) {
      Object.entries(rest).forEach(([key, value]) => {
        this[key] = value;
      });
    }
  }
}

// status , success , message , data

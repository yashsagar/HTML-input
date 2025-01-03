import * as yup from "yup";

const signupSchema = yup.object({
  name: yup
    .string()
    .required("User Name Required")
    .min(3, "Name must be atlist 3 character"),
  email: yup.string().required("Email Required").email("Invalid Email"),
  password: yup
    .string()
    .required("Password Required")
    .test("password-test", "invalid formate", (value, context) => {
      const validation = [
        {
          regex: /[A-Z]/,
          message: "1 capital letter",
        },
        {
          regex: /[a-z]/,
          message: "1 lower case letter",
        },
        {
          regex: /[0-9]/,
          message: "1 number",
        },
        {
          regex: /[!@#$%^&*]/,
          message: "1 specila charecter !@#$%^&*",
        },
        {
          regex: /.{8,}/,
          message: "minimum 8 character ",
        },
      ];

      const error = validation
        .filter(({ regex }) => !regex.test(value))
        .map(({ message }) => message);

      if (error.length > 0) {
        return context.createError({
          message: error.join(","),
        });
      }
      return true;
    }),
});

const loginSchema = yup.object({
  email: yup.string().required("Email is requited"),
  password: yup
    .string()
    .required("password required")
    .min(8, "Invalid Credentials"),
});

const validateFunction = async ({ schema, data }) => {
  try {
    const validatedData = await schema.validate(data, { abortEarly: false });
    validatedData.isValid = true;
    return validatedData;
  } catch (error) {
    const errorData = error.inner.reduce((acc, current) => {
      acc[current.path] = current.message;
      return acc;
    }, {});
    errorData.isValid = false;
    return errorData;
  }
};

export const validate = async ({ schema, data }) => {
  switch (schema) {
    case "login": {
      return validateFunction({ schema: loginSchema, data });
    }
    case "signup": {
      return validateFunction({ schema: signupSchema, data });
    }
  }
};

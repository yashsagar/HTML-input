import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const FormikComponent = () => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .default(18),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const validData = {
    name: "Alice",

    email: "alice@example.com",
  };

  schema
    .validate(validData)
    .then((data) => console.log("Validated Data:", data))
    .catch((err) => console.error("Validation Error:", err.errors));

  return (
    <Formik
      initialValues={{ gender: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ values }) => (
        <Form>
          <label>
            <Field name="gender" type="radio" value="male" />
            Male
          </label>
          <label>
            <Field name="gender" type="radio" value="female" />
            Female
          </label>
          <button type="submit">Submit</button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};
export default FormikComponent;

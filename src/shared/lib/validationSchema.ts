import * as yup from "yup";

export const nameSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Za-z]+$/, "Name must consist of letters only"),
});

export const factValidationSchema = yup.object({});

/* eslint-disable */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { factValidationSchema } from "../../../shared/lib/validationSchema";

export const FactFetcherForm = ({ onFactSubmit }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(factValidationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onFactSubmit)}>
      <button type="submit">Submit Fact</button>
      {errors.someField && <p>{errors.someField.message}</p>}
    </form>
  );
};

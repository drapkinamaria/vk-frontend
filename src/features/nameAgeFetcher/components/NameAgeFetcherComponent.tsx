import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNameAgeFetch } from "../model/useNameAgeFetch";
import { nameSchema } from "../../../shared/lib/validationSchema";
import "../../../ui/styles/styles.css";

export function NameAgeFetcherComponent(): JSX.Element {
  const {
    name,
    age,
    isFetching,
    errorMessage,
    handleNameChange,
    handleNameSubmit,
  } = useNameAgeFetch();

  const {
    register,
    formState: { errors },
    handleSubmit: validateForm,
  } = useForm({
    resolver: yupResolver(nameSchema),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm(handleNameSubmit);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="fact-fetcher-container">
        <input
          type="text"
          value={name}
          {...register("name")}
          onChange={handleNameChange}
          disabled={isFetching}
        />
        <button type="submit" disabled={isFetching || !!errors.name}>
          {isFetching ? "Fetching..." : "Submit"}
        </button>
      </form>
      {errors.name ? (
        <p className="error">{errors.name.message}</p>
      ) : errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : (
        age !== null && (
          <p>
            The estimated age for {name} is: {age}
          </p>
        )
      )}
    </div>
  );
}

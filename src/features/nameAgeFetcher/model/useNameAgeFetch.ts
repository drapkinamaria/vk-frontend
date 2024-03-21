/* eslint-disable */
import { useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import { fetchAgeByName } from "./nameAgeApi";
import { nameSchema } from "../../../shared/lib/validationSchema";
import { ValidationError } from "yup";

export function useNameAgeFetch() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const handleFetchAgeDebounced = debounce(async (targetName: string) => {
    try {
      await nameSchema.validate({ name: targetName });

      if (abortController) {
        abortController.abort();
      }

      const newAbortController = new AbortController();
      setAbortController(newAbortController);

      setIsFetching(true);
      const fetchedAge = await fetchAgeByName(
        targetName,
        newAbortController.signal,
      );
      setAge(fetchedAge);
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrorMessage(error.message);
      } else if (!abortController || !abortController.signal.aborted) {
        setErrorMessage("Failed to fetch age. Please try again.");
        console.error("Fetch error:", error);
      }
    } finally {
      setIsFetching(false);
    }
  }, 3000);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    handleFetchAgeDebounced(newName);
  };

  const handleNameSubmit = () => {
    handleFetchAgeDebounced.cancel();
    handleFetchAgeDebounced(name);
  };

  useEffect(() => {
    return () => {
      handleFetchAgeDebounced.cancel();
      abortController?.abort();
    };
  }, [abortController]);

  return {
    name,
    age,
    isFetching,
    errorMessage,
    handleNameChange,
    handleNameSubmit,
  };
}

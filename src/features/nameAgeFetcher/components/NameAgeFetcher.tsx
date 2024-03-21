import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../shared/lib/queryClient";
import { NameAgeFetcherComponent } from "./NameAgeFetcherComponent";

export function NameAgeFetch(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NameAgeFetcherComponent />
    </QueryClientProvider>
  );
}

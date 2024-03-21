import { useQuery } from "@tanstack/react-query";
import { fetchFact } from "./factApi";

export function useFactFetcher() {
  return useQuery({
    queryKey: ["FactKey"],
    queryFn: fetchFact,
    enabled: false,
  });
}

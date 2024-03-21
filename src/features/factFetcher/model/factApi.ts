import { Fact } from "../../../shared/types/types";

export async function fetchFact(): Promise<Fact> {
  const response = await fetch("https://catfact.ninja/fact");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

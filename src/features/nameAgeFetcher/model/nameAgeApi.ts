export async function fetchAgeByName(
  name: string,
  signal: AbortSignal,
): Promise<number | null> {
  if (!name) return null;

  const response = await fetch(`https://api.agify.io/?name=${name}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.age;
}

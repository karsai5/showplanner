import { map, pickBy } from "lodash";

export type Serialised<T> = Partial<Record<keyof T, string | null>>;
export function getSerialisedDTO<T extends object>(dto: T): Serialised<T> {
  const serialisedDTO: Serialised<T> = {};

  map(dto, (value, key) => {
    if (value instanceof Date) {
      serialisedDTO[key as keyof T] = value.toISOString();
    } else if (typeof value?.toString === "function") {
      serialisedDTO[key as keyof T] = value.toString();
    } else if (value !== undefined || null) {
      console.error("Could not serialise value", key, value);
    }
  });

  return pickBy(serialisedDTO, (x) => x) as Serialised<T>;
}

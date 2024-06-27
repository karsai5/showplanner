import { ResponseError } from "core/api/generated";
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

export const getSSRErrorReturn = (err: unknown) => {
  if (err instanceof ResponseError) {
    switch (err.response.status) {
      case 404:
        return {
          redirect: {
            destination: "/500",
            permanent: false,
          },
        };
      case 401:
        return {
          redirect: {
            destination: "/400",
            permanent: false,
          },
        };
      case 500:
      default:
        return {
          redirect: {
            destination: "/500",
            permanent: false,
          },
        };
    }
  } else {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};

import { API_URL } from "./config";

export enum IMAGE_SIZE {
  large = "large",
  medium = "medium",
  small = "small",
  thumbnail = "thumbnail",
}

export const returnUrl = (url: string) => {
  return `${API_URL}${url}`;
};

export const getImageUrl = (
  image: any,
  preferredSize?: "large" | "medium" | "small" | "thumbnail"
) => {
  const formats = image?.data?.attributes?.formats;
  if (!formats) {
    return undefined;
  }
  const { large, medium, small, thumbnail } = formats;
  if (large) {
    if (!preferredSize || preferredSize === "large") {
      return returnUrl(large.url);
    }
  }
  if (medium) {
    if (
      !preferredSize ||
      preferredSize === "large" ||
      preferredSize === "medium"
    ) {
      return returnUrl(medium.url);
    }
  }
  if (small) {
    if (
      !preferredSize ||
      preferredSize === "large" ||
      preferredSize === "medium" ||
      preferredSize === "small"
    ) {
      return returnUrl(small.url);
    }
  }
  if (thumbnail) {
    return returnUrl(thumbnail.url);
  }
};

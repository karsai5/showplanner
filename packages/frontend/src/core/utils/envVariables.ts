export const getRequiredEnvVariable = (value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing required environment variable`);
  }
  return value;
};

export const isProd = () => process.env.NODE_ENV === "production";
export const isDev = () => process.env.NODE_ENV === "development";

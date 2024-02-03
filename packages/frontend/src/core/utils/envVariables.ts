export const getRequiredEnvVariable = (value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing required environment variable`);
  }
  return value;
};

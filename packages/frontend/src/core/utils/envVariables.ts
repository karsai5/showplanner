export const getRequiredEnvVariable = (value: any): string => {
  if (!value) {
    throw new Error(`Missing required environment variable`);
  }
  return value;
}


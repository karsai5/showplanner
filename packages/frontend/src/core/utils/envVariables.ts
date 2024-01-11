export const getRequiredEnvVariable = (value: any): string => {
  if (!value) {
    throw new Error(`Missing required environment variable`);
  }
  return value;
}

export const getEnvVariable = (key: string): string | undefined => {
  const value = process.env[key];
  return value;
}

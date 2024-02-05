export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.warn("No API URL defined");
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const GRAPHQL_URL = `${API_URL}/graphql`;

if (!API_URL) {
  console.warn("No API URL defined");
}


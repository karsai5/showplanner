const config = {
  schema: "http://localhost:1337/graphql",
  documents: ["./src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/core/gql/": { preset: "client", plugins: [] },
  },
};
export default config;

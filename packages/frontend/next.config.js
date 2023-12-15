module.exports = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "planner-api.communitycrewing.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

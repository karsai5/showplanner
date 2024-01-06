module.exports = {
  reactStrictMode: true,
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
       {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/maps/api/staticmap',
      },
    ],
  },
};

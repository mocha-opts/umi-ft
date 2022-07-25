export default {
  npmClient: "pnpm",
  apiRoute: {
    platform: "vercel",
  },
  routes: [
    { exact: true, path: "/", component: "index" },
    { exact: true, path: "/posts/create", component: "posts/create" },
    { exact: true, path: "/login", component: "login" },
    { exact: true, path: "/register", component: "register" },
    { exact: true, path: "/posts/:postId", component: "posts/post" },
    { exact: true, path: "/topology", component: "topology" },
  ],
  plugins: [
    // require.resolve("@umijs/plugins/dist/tailwindcss"),
    require.resolve("@umijs/plugins/dist/dva"),
    require.resolve("@umijs/plugins/dist/qiankun"),
    require.resolve("@umijs/plugins/dist/locale"),
    require.resolve("@umijs/plugins/dist/request"),
  ],
  // tailwindcss: {},
  dva: {},
  request: {},
  mock: false,
  qiankun: {
    master: {
      apps: [
        {
          name: "app1",
          entry: "//localhost:8000",
        },
        {
          name: "app2",
          entry: "//localhost:7002",
        },
      ],
    },
  },
};

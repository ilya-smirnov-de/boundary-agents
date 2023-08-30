const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "about", component: () => import("pages/BaAbout.vue") },
      { path: "/search", component: () => import("pages/BaSearch.vue") },
      { path: "/courts", component: () => import("pages/BaCourts.vue") },
      {
        path: "/details/:id",
        component: () => import("pages/BaDetails.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

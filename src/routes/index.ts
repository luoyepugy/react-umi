export default [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/report/list',
        component: '../pages/report/list',
      },
      {
        path: '/report/detail',
        component: '../pages/report/detail',
      },
      {
        path: '/',
        component: '../pages/index',
      },
    ],
  },
];

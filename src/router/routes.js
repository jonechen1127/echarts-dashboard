const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/login'
  },   
  {
    path: '/components',
    name: 'components',
    component: () => import('@/views/layout/index'),
    redirect: '/components/bar',
    children: [
      {
        path: 'bar',
        name: 'bar',
        component: () => import('@/components/echart/bar')
      },
      {
        path: 'pie',
        name: 'pie',
        component: () => import('@/components/echart/pie')
      },
      {
        path: 'gauge',
        name: 'gauge',
        component: () => import('@/components/echart/gauge')
      },
      {
        path: 'graph',
        name: 'graph',
        component: () => import('@/components/echart/graph')
      },
      {
        path: 'line',
        name: 'line',
        component: () => import('@/components/echart/line')
      },
      {
        path: 'funnel',
        name: 'funnel',
        component: () => import('@/components/echart/funnel')
      },
      {
        path: 'radar',
        name: 'radar',
        component: () => import('@/components/echart/radar')
      },
      {
        path: 'outlinemap',
        name: 'outlinemap',
        component: () => import('@/components/echart/outlinemap')
      }
    ]
  },
  {
    path: '/error/404',
    component: () => import('@/views/error/404'),
    meta: { title: '404' }
  },
  { path: '*', redirect: '/error/404' }
]

export default routes

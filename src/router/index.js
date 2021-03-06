import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from "@/layouts/MainLayout";
import WeeklyReportView from "@/views/WeeklyReportView";
import ReportLayout from "@/layouts/ReportLayout";
import TemperatureLayout from "@/layouts/TemperatureLayout";
import RegistrationView from "@/views/AuthLayout/RegistrationView";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/views/AuthLayout/LoginView";
import OffsetHistoryView from "@/views/TemperatureLayout/OffsetHistoryView";
import SolverView from "@/views/TemperatureLayout/SolverView";
import ChangerView from "@/views/TemperatureLayout/ChangerView";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      {
        path: '/report',
        name: 'ReportLayout',
        component: ReportLayout,
        children: [
          {
            path: 'weekly/:id',
            name: 'weekly',
            component: WeeklyReportView,
          }
        ]
      },
      {
        path: '/offsets',
        name: 'TemperatureLayout',
        component: TemperatureLayout,
        children: [
          {
            name: 'OffsetsHistory',
            path: 'history',
            component: OffsetHistoryView
          },
          {
            name: 'Solver',
            path: 'solver',
            component: SolverView
          },
          {
            name: 'Changer',
            path: 'changer',
            component: ChangerView
          }
        ]
      },
      {
        path: '/auth',
        name: 'AuthLayout',
        component: AuthLayout,
        children: [
          {
            path: 'reg',
            name: 'Registration',
            component: RegistrationView
          },
          {
            path: 'login',
            name: 'Login',
            component: LoginView
          }
        ]
      }
    ]
  },

]

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.path === '/auth/reg' || to.path === '/auth/login') {
    if (localStorage.getItem('token'))
      next('/')
  } else {
    if (!localStorage.getItem('token'))
      next('/auth/login')
  }
  next();
})


export default router

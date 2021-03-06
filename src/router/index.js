import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from "@/layouts/MainLayout";
import WeeklyReportView from "@/views/WeeklyReportView";
import ReportLayout from "@/layouts/ReportLayout";
import TemperatureLayout from "@/layouts/TemperatureLayout";
import RegistrationView from "@/views/MainLayout/RegistrationView";
import AuthLayout from "@/layouts/AuthLayout";


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
        path: '/temperature',
        name: 'TemperatureLayout',
        component: TemperatureLayout
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


export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from "@/layouts/MainLayout";
import WeeklyReportView from "@/views/WeeklyReportView";
import ReportLayout from "@/layouts/ReportLayout";
import TemperatureLayout from "@/layouts/TemperatureLayout";


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
      }
    ]
  },

]

const router = new VueRouter({
  routes,
  mode: "history"
});


export default router

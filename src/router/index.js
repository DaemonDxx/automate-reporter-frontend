import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from "@/layouts/MainLayout";
import WeeklyReportView from "@/layouts/WeeklyReportView";


Vue.use(VueRouter)

const routes = [
  {
    path: '/report',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      {
        path: 'weekly',
        component: WeeklyReportView,
      }
    ]
  },
]

const router = new VueRouter({
  routes
});


export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from "@/layouts/MainLayout";
import RegistrationView from "@/views/AuthLayout/RegistrationView";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/views/AuthLayout/LoginView";
import OffsetHistoryView from "@/views/TemperatureLayout/OffsetHistoryView";
import SolverView from "@/views/TemperatureLayout/SolverView";
import UploadFilesView from "@/views/TemperatureLayout/UploadFilesView";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
          {
            name: 'OffsetsHistory',
            path: 'database',
            component: OffsetHistoryView
          },
          {
            name: 'Solver',
            path: 'solver',
            component: SolverView
          },
          {
            name: 'Changer',
            path: 'db_changer',
            component: UploadFilesView
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

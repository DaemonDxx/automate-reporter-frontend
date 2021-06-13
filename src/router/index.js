import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from "@/layouts/MainLayout";
import RegistrationView from "@/views/AuthLayout/RegistrationView";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/views/AuthLayout/LoginView";
import OffsetHistoryView from "@/views/TemperatureLayout/OffsetHistoryView";
import SolverView from "@/views/TemperatureLayout/SolverView";
import UploadFilesView from "@/views/TemperatureLayout/UploadFilesView";
import store from '../store/index';
import AccessDeniedView from "../views/TemperatureLayout/AccessDeniedView";

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
            component: OffsetHistoryView,
            meta: {accessList: ['ALL']}
          },
          {
            name: 'Solver',
            path: 'solver',
            component: SolverView,
            meta: {accessList: ['ALL']}
          },
          {
            name: 'Changer',
            path: 'db_changer',
            component: UploadFilesView,
            meta: {accessList: ['ADMIN', 'CREATOR']},
          },
      {
        name: 'AccessDenied',
        path: 'denied',
        component: AccessDeniedView
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

const isAuth = () => !!localStorage.getItem('token');
const hasNotAccess = (accessList) => !(accessList.includes('ALL') || accessList.includes(store.state.Auth.user.role));

router.beforeEach((to, from, next) => {
  if (to.path === '/auth/reg' || to.path === '/auth/login') {
    if (isAuth())
      next('/')
  } else {
    if (!isAuth())
      next('/auth/login')
    if (to.meta.accessList && hasNotAccess(to.meta.accessList))
      next('/denied');
  }
  next();
})


export default router

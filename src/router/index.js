import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 导航栏点击刷新
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '设备概览', icon: 'el-icon-odometer' }
    }]
  },
  // 监测标准
  {
    path: '/standard',
    component: Layout,
    redirect: '/standard/type',
    name: 'Standard',
    meta: { title: '监测标准', icon: 'el-icon-edit' },
    children: [
      {
        path: 'type',
        name: 'Type',
        component: () => import('@/views/table/index'),
        meta: { title: '监测类型' }
      },
      {
        path: 'stateDefine',
        name: 'StateDefine',
        component: () => import('@/views/tree/index'),
        meta: { title: '设备状态定义' }
      },
      {
        path: 'orderDefine',
        name: 'OrderDefine',
        component: () => import('@/views/water/index'),
        meta: { title: '指令定义' }
      }
    ]
  },
  // 固件库
  {
    path: '/firmware',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Firmware',
        component: () => import('@/views/form/index'),
        meta: { title: '固件库', icon: 'firmware-library' }
      }
    ]
  },
  // 设备管理
  {
    path: '/manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Manage',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '设备管理', icon: 'nested' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/table/index'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/tree/index'),
        meta: { title: '角色管理' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/water/index'),
        meta: { title: '菜单管理' }
      }
    ]
  },
  // 跳转外网
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://ghiot.cigem.cn:8080/doc/overview/overview.html',
        meta: { title: '开发文档', icon: 'el-icon-document' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

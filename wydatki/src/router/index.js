import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '@/firebase'
import EditABill from '../views/EditABill.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/bills/:billId',
        name: 'EditABill',
        component: EditABill,
        },
    {
        path: '/createabill',
        name: 'CreateABill',
        component: () =>
            import ('../views/CreateABill.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        login: 'Login',
        component: () =>
            import ('../views/LoginView.vue')

    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !auth.currentUser) {
        next('/login')
        return;
    }

    if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
        next('/')
        return;
    }

    next();
})

export default router
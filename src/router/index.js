
import NotFound from '@/components/404.vue'
import Index from '@/components/Index.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Store from '@/components/Store.vue'
import Qualification from '@/components/Qualification.vue'
import Settlement from '@/components/Settlement.vue'
import Finish from '@/components/Finish.vue'
let routes = [{
    path: '/index',
    component: Index,
    name: 'index'
}, {
    path: '/404',
    component: NotFound,
    name: '404'
}, {
    path: '/',
    redirect: { path: '/index' },
    name: '/'
}, {
    path: '/store',
    component: Store,
    name: 'store'
}, {
    path: '/qualification',
    component: Qualification,
    name: 'qualification'
}, {
    path: '/settlement',
    component: Settlement,
    name: 'settlement'
},  {
    path: '/waitAduit',
    component: Finish,
    name: 'waitAduit'
}, {
    path: '*',
    redirect: { path: '/404' }
}];

export default routes;
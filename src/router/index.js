
import NotFound from '@/components/404.vue'
import Index from '@/components/Index.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Store from '@/components/Store.vue'
import Qualification from '@/components/Qualification.vue'
import Delivery from '@/components/Delivery.vue'
import Settlement from '@/components/Settlement.vue'
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
    component: HelloWorld,
    name: 'helloWorld'
}, {
    path: '/store',
    component: Store,
    name: 'store'
}, {
    path: '/qualification',
    component: Qualification,
    name: 'qualification'
}, {
    path: '/delivery',
    component: Delivery,
    name: 'delivery'
}, , {
    path: '/settlement',
    component: Settlement,
    name: 'settlement'
}, {
    path: '*',
    redirect: { path: '/404' }
}];

export default routes;
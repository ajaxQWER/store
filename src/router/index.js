
import NotFound from '@/components/404.vue'
import Index from '@/components/Index.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Store from '@/components/Store.vue'
import Qualification from '@/components/Qualification.vue'
import Settlement from '@/components/Settlement.vue'
import Finish from '@/components/Finish.vue'
import Agreement from '@/components/Agreement.vue'
import AboutUs from '@/components/AboutUs.vue'
import ContactUs from '@/components/ContactUs.vue'
import FranchiseGuide from '@/components/FranchiseGuide.vue'
import MarketPartnership from '@/components/MarketPartnership.vue'
import Questions from '@/components/Questions.vue'
import LegalStatement from '@/components/LegalStatement.vue'
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
},  {
  path: '/agreement',
  component: Agreement,
  name: 'agreement'
},  {
  path: '/aboutUs',
  component: AboutUs,
  name: 'aboutUs'
},  {
  path: '/contactUs',
  component: ContactUs,
  name: 'contactUs'
},  {
  path: '/franchiseGuide',
  component: FranchiseGuide,
  name: 'franchiseGuide'
},  {
  path: '/marketPartnership',
  component: MarketPartnership,
  name: 'marketPartnership'
},  {
  path: '/questions',
  component: Questions,
  name: 'questions'
},  {
  path: '/legalStatement',
  component: LegalStatement,
  name: 'legalStatement'
}, {
    path: '*',
    redirect: { path: '/404' }
}];

export default routes;

import Myflights from "../pages/client/myflights"
import Login from '../pages/login'
import PageNotFind from '../pages/PageNotFind'
import Order from '../pages/client/order'
import Search from "../pages/dashboard/search"
import Flightlist from "../pages/dashboard/flightlist"
export const mainRoutes = [
    {
        path: '/login',
        component:Login    
    },{
        path: '/404',
        component:PageNotFind
    },
]
export const clientRoutes = [
    {
        path: '/view/client/myflights',
        component:Myflights
    },{
        path: '/view/client/order',
        component:Order
    }, {
        path: '/view/search',
        component: Search,
    },{
        path: '/view/list',
        component: Flightlist,
    }
]
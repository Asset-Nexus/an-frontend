import {
    Home,
    AssetList,
} from './pages'
import Create from './pages/Create'

const routes = [{
    path: '/',
    component: Home,
    title: 'Home',
    isNav: true,
},
{
    path: 'assetlist',
    component: AssetList,
    title: 'Asset List',
    isNav: true,
},
{
    path: 'mint',
    component: Create,
    title: 'Mint Asset',
    isNav: true,
},
]

export default routes
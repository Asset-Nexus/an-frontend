import { 
    Home,
    AssetList,
} from './pages'

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
}
]

export default routes
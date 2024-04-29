import React from 'react';
import routes from './routes';
import {
    Routes,
    Route,
    NavLink,
    Outlet,
    Link,
} from 'react-router-dom';
import { 
    Home,
    AssetList,
    LayoutPage
} from './pages'
// const items = [

//   {
//     key: 'sub2',
//     label: 'Home',
//   },
//   {
//     key: 'sub4',
//     label: 'Sell Assets',
//   },
//   {
//     key: 'grp',
//     label:(<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//         Connect Wallet
//       </a>) 

//   },
// ];


const App = () => {
    return (
    <>
     
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<Home />} />
          <Route path="assetlist" element={<AssetList />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};



function NoMatch() {
  return (
    <div>
      <h1>Nothing to see here!</h1>
      <p>
        <NavLink to="/">Go to the home page</NavLink>
      </p>
    </div>
  );
}
export default App;

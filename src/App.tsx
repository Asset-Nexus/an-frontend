import React from 'react';
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


import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import Create from './pages/Create';

const queryClient = new QueryClient() 

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
      <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<Home />} />
        <Route path="assetlist" element={<AssetList />} />
        <Route path="mint" element={<Create />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
      </QueryClientProvider> 
    </WagmiProvider>
  )
}


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

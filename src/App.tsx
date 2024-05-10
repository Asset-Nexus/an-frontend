import React from 'react';
import {
  Routes,
  Route,
  NavLink,
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
import MyAssetList from './pages/MyAssetList';
import Register from './pages/Register';
import { ConfigProvider } from 'antd';


const queryClient = new QueryClient()

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorTextBase: "white",
          colorPrimary: '#FF5733',
          borderRadius: 4,

          // Alias Token
          colorBgContainer: '#f6ffed',
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<LayoutPage />}>
              <Route index element={<Home />} />
              <Route path="assetlist" element={<AssetList />} />
              <Route path="myassets" element={<MyAssetList />} />
              <Route path="mint" element={<Create />} />
              <Route path="register" element={<Register />} />

              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigProvider>
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

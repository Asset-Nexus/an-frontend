import React from 'react'
import { Layout, Menu,theme} from 'antd';
import { NavLink, Outlet } from 'react-router-dom'

import { ConnectWallet } from '../../components';
import routes from '../../routes';
const { Header, Content, Footer } = Layout;


const LayoutPage = () => {
      const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
    return (  
        <Layout>
            <Header
                style={{
                display: 'flex',
                alignItems: 'center',
                }}
            >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={
              
              routes.map((route) => { 
                  return ({
                      key: route.path,
                      label: (
                           <NavLink to={route.path}>
                                {route.title}
                            </NavLink>
                      )
                  })
              })      
                  
        
          }
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />

        <ConnectWallet />        
        </Header>
            <Content style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
                 <Layout style={{padding: 40}}> 
                <Outlet />
                </Layout> 
         </Content>
         <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Asset Nexus ©{new Date().getFullYear()}
      </Footer>    
     </Layout> 
  )
}

export default LayoutPage;
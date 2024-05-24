import { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { ConnectWallet } from '../../components';
import routes from '../../routes';
import styled from '@emotion/styled';
import { MenuOutlined } from '@ant-design/icons';
import { bp } from '../../components/breakpoints';
const { Header, Content, Footer } = Layout;

const MyMenu = styled(Menu)`
    display: none;
    @media ${bp.md} {
       display: block;
  }
`
const MenuButton = styled(Button)`
    margin-left: 1em;
    @media ${bp.md} {
       display: none !important;
  }
`

const LayoutPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <MyMenu
          theme="dark"
          mode="horizontal"
          items={
            routes.map((route) => {
              return {
                key: route.path,
                label: (
                  <NavLink to={route.path}>
                    {route.title}
                  </NavLink>
                ),
              };
            })
          }
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Button type='link' href='register' style={{color: "white", marginLeft: "auto"}}>Sign up</Button>
        <ConnectWallet />
        <MenuButton type="primary" icon={<MenuOutlined />} onClick={handleDrawerOpen}>
        </MenuButton>
      </Header>

      <Content style={{
        background: "#2B2B2B",
        minHeight: 280,
      }}>
        <Layout style={{ background: "#2B2B2B" }}>
          <Outlet />
        </Layout>
      </Content>
      <Footer
        style={{
          background: "black",
          textAlign: 'center',
        }}
      >
        Asset Nexus ©{new Date().getFullYear()}
      </Footer>

      <Drawer
        title="Menu"
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        visible={isDrawerOpen}
      >
        <Menu
          mode="vertical"
          items={
            routes.map((route) => {
              return {
                key: route.path,
                label: (
                  <NavLink to={route.path}>
                    {route.title}
                  </NavLink>
                ),
              };
            })
          }
        />
      </Drawer>
    </Layout>
  );
};

export default LayoutPage;
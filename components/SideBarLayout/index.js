import React, { useState } from 'react';
import { Layout, theme } from 'antd';

import { ReconciliationOutlined } from '@ant-design/icons';

import { NavMenu } from './NavMenu';
import NavHeader from './NavHeader';

import style from './styles.module.scss';

export function SideBarLayout({ children }) {
  const [barTitle, setBarTitle] = useState('Dashboard');
  const { Content, Footer, Sider } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className={style.layoutContainer}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <div className={style.headerWrapper}>
          <ReconciliationOutlined
            style={{ fontSize: '30px', color: '#ffff' }}
          />
          <p>MIPESRI CBT</p>
        </div>
        <NavMenu setBarTitle={setBarTitle} />
      </Sider>
      <Layout>
        <NavHeader barTitle={barTitle} />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          MI PESRI CBT ©2023 Created by MI PESRI Kendari
        </Footer>
      </Layout>
    </Layout>
  );
}

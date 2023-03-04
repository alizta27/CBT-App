import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import appPath from '@/constant/appPath';

import admin from './navItem';

export function NavMenu({ setBarTitle }) {
  const { role } = useSelector(({ common }) => common);
  const router = useRouter();
  const { asPath } = router;

  const [selectedMenu, setSelectedMenu] = useState('/');

  useEffect(() => {
    setSelectedMenu(asPath);
  }, [asPath]);

  const handleBarTitle = (value) => {
    switch (value) {
      case appPath.admin.dashboard:
        setBarTitle('Dashboard');
        break;
      case appPath.admin.classList:
        setBarTitle('Daftar Kelas');
        break;
      case appPath.admin.addClass:
        setBarTitle('Tambah Kelas');
        break;
      case appPath.admin.teacherList:
        setBarTitle('Daftar Guru');
        break;
      case appPath.admin.addTeacher:
        setBarTitle('Tambah Guru');
        break;
      case appPath.admin.studentList:
        setBarTitle('Daftar Siswa');
        break;
      case appPath.admin.addStudent:
        setBarTitle('Tambah Siswa');
        break;

      default:
        setBarTitle('Dashboard');
        break;
    }
  };

  useEffect(() => {
    handleBarTitle(window?.location?.pathname);
  }, []);

  return (
    <Menu
      style={{ background: 'transparent', color: 'white' }}
      mode="inline"
      defaultSelectedKeys={['/']}
      selectedKeys={selectedMenu}
      items={admin.map((item) => ({
        key: item.path,
        label: item.title,
        children: item?.children?.map((el) => ({
          key: el.path,
          label: el.title,
        })),
      }))}
      onClick={({ key }) => {
        console.log('KEYT: ', key);
        handleBarTitle(key);
        setSelectedMenu(key);
        router.push(key);
      }}
    />
  );
}

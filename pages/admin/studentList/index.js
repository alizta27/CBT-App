import { Table, Button } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { CustomTable, SidebarContext } from '@/components';
import AddClassForm from '@/components/AddClassForm';

import styles from './styles.module.scss';

export default function StudentList() {
  const columns = [
    {
      title: 'Nama Lengkap',
      dataIndex: 'fullName',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Kelas',
      dataIndex: 'class',
    },
    {
      title: 'Aksi',
      dataIndex: 'action',
      filterDropdown: <p>a</p>,
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      fullName: 'Afdal Al Farabi',
      username: `alfarabi`,
      class: `${i} A`,
      action: (
        <div className={styles.buttonContainer}>
          <Button>
            <EditOutlined />
            Edit
          </Button>
          <Button danger>
            <DeleteOutlined />
            Hapus
          </Button>
        </div>
      ),
    });
  }

  return (
    // <SideBarLayout>
    // <div className={styles.container}>
    <CustomTable columns={columns} data={data} />
    // {/* </div> */}
    // {/* <AddClassForm /> */}
    // {/* </SideBarLayout> */}
  );
}

import { Table, Button } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { CustomTable, SidebarContext } from '@/components';
import AddClassForm from '@/components/AddClassForm';

import styles from './styles.module.scss';

export default function TeacherList() {
  const columns = [
    {
      title: 'Namaa Lengkap',
      dataIndex: 'fullName',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Mata Pelajaran',
      dataIndex: 'task',
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
      username: `alafarabi`,
      task: `Ilmu Pengatahuan Alam`,
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

import { Table, Button } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { CustomTable, SidebarContext } from '@/components';
import AddClassForm from '@/components/AddClassForm';

import styles from './styles.module.scss';

export default function ClassList() {
  const columns = [
    {
      title: 'Tingkat',
      dataIndex: 'class',
    },
    {
      title: 'Nama Kelas',
      dataIndex: 'className',
    },
    {
      title: 'Jumlah Siswa',
      dataIndex: 'totalStudents',
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
      class: 5,
      className: `5 A`,
      totalStudents: `${i}`,
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

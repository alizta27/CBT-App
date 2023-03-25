import React from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Divider,
  notification,
} from 'antd';

import { CustomTable, DragDrop } from '@/components';
import AddClassForm from '@/components/form';

import { useDispatch } from 'react-redux';
import { bulkAddClass } from '@/store/actions';
import AddExamForm from '@/components/form/AddExamForm';

const { Text, Title } = Typography;

export default function CreateExam() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const onDragDrop = async (data) => {
    if (data) {
      const payload = data.map((el) => {
        return {
          grade: el.Tingkat,
          total_student: el['Jumlah Siswa'],
          name: el['Nama Kelas'],
        };
      });
      const { data: dataApi } = await dispatch(bulkAddClass(payload));
      if (dataApi) {
        api.success({
          message: `Success`,
          description: dataApi.message,
          placement: 'topRight',
        });
      } else {
        api.error({
          message: `Error`,
          description: 'Gagal menambahkan data. Coba lagi',
          placement: 'topRight',
        });
      }
    }
  };

  const columns = [
    {
      title: 'Token',
      dataIndex: 'token',
    },
    {
      title: 'Durasi',
      dataIndex: 'duration',
    },
    {
      title: 'Aksi',
      dataIndex: 'action',
    },
  ];

  return (
    <>
      {contextHolder}
      <Title level={2}>Tambah Data Ujian</Title>
      <Text>
        Tambah Data Ujian dengan mengisi form di bawah ini dan buat token
        sebagai syarat mengikuti ujian.
      </Text>
      <Divider />
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Kelas" bordered={false}>
            <AddExamForm />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Token"
            bordered={false}
            extra={<Button>Buat Token</Button>}
          >
            <CustomTable columns={columns} data={[]} />
          </Card>
        </Col>
      </Row>
    </>
  );
}

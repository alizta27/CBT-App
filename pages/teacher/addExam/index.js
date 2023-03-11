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

import { DragDrop } from '@/components';
import AddExamForm from '@/components/form/AddExamForm';

import { useDispatch } from 'react-redux';
import { bulkAddClass } from '@/store/actions';

const { Text, Title } = Typography;

export default function AddExam() {
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
  return (
    <>
      {contextHolder}
      <Title level={2}>Tambah Data Ujian</Title>
      <Text>
        Tambah Data Ujian dengan mengisi form di bawah ini atau dengan
        mendowload template yang sudah disediakan dan menguploadnya melalu form
        upload file.
      </Text>
      <Divider />
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Tambah Kelas" bordered={false}>
            <AddExamForm />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Upload File"
            bordered={false}
            extra={<Button>Template</Button>}
          >
            <DragDrop onDragDrop={onDragDrop} />
          </Card>
        </Col>
      </Row>
    </>
  );
}

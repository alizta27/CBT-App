import React from 'react';
import { Button, Card, Col, Row, Typography, Divider } from 'antd';

import { DragDrop } from '@/components';
import AddClassForm from '@/components/AddClassForm';

import { useDispatch } from 'react-redux';
import { bulkAddClass } from '@/store/actions';

import styles from './styles.module.scss';

const { Text, Title } = Typography;

export default function AddClass() {
  const dispatch = useDispatch();

  const onDragDrop = (data) => {
    if (data) {
      const payload = data.map((el) => {
        return {
          grade: el.Tingkat,
          total_student: el['Jumlah Siswa'],
          name: el['Nama Kelas'],
        };
      });
      dispatch(bulkAddClass(payload));
    }
  };
  return (
    <>
      <Title level={2}>Tambah Data Kelas</Title>
      <Text>
        Tambah Data Kelas dengan mengisi form di bawah ini atau dengan
        mendowload template yang sudah disediakan dan menguploadnya melalu form
        upload file.
      </Text>
      <Divider />
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Tambah Kelas" bordered={false}>
            <AddClassForm />
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

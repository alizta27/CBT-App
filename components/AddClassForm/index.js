import React from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';

import { useDispatch } from 'react-redux';

import { addClass } from '@/store/actions';

export default function AddClassForm() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(addClass(values));
  };

  return (
    <Form onFinish={onFinish} form={form} layout="vertical">
      <Form.Item label="Nama Kelas" name="name">
        <Input placeholder="Nama Kelas" required />
      </Form.Item>
      <Form.Item label="Tingkat" name="grade" required>
        <Select>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="6">6</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Jumlah Siswa" name="total_student">
        <InputNumber type="number" required />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Simpan
        </Button>
      </Form.Item>
    </Form>
  );
}

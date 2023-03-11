import React, { useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';

import { useDispatch } from 'react-redux';

import { addTeacher } from '@/store/actions';

const { TextArea } = Input;
export default function AddExamForm({ onEditForm, editData, isEdit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    if (onEditForm) {
      onEditForm(values);
      return;
    }
    const { data: dataApi } = await dispatch(addTeacher(values));
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
  };

  useEffect(() => {
    if (editData && onEditForm) {
      form.setFieldsValue(editData);
    }
  }, [onEditForm, editData]);

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item label="Nama Lengkap" name="exam_link">
          <Input placeholder="Name Lengkap" required />
        </Form.Item>
        <Form.Item label="Kunci Jawaban" name="answer">
          <TextArea placeholder="Mata Pelajaran" required />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

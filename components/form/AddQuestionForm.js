import React, { useEffect, useState } from 'react';
import { Button, Form, Input, notification, Select } from 'antd';

import { useDispatch } from 'react-redux';

import { addQuestion, bulkAddQuestion, getAllClass } from '@/store/actions';

const { TextArea } = Input;
export default function AddQuestionForm({ onEditForm, editData }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  const [classOptions, setClassOptions] = useState([]);

  const fetchAllClass = async () => {
    const { data } = await dispatch(getAllClass());

    if (data) {
      const newOptions = data?.class?.map((el) => {
        return {
          label: `${el.grade} ${el.name}`,
          value: el.id,
        };
      });
      setClassOptions(newOptions);
    }
  };

  useEffect(() => {
    fetchAllClass();
  }, []);

  const onFinish = async (values) => {
    // if (onEditForm) {
    //   onEditForm(values);
    //   return;
    // }

    const { answer, class_id, question_link } = values;
    const payload = class_id.map((el) => {
      return {
        answer,
        question_link,
        class_id: el,
      };
    });
    console.log('payload: ', payload);

    const { data: dataApi } = await dispatch(bulkAddQuestion(payload));
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
        <Form.Item label="Link Soal" name="question_link">
          <Input placeholder="Link Soal" required />
        </Form.Item>
        <Form.Item label="Kunci Jawaban" name="answer">
          <TextArea placeholder="Mata Pelajaran" required />
        </Form.Item>
        <Form.Item label="Kelas" name="class_id" required>
          <Select options={classOptions} mode="multiple" allowClear />
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

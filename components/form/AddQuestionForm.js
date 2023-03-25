import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, notification, Select } from 'antd';

import { useDispatch } from 'react-redux';

import {
  addQuestion,
  bulkAddQuestion,
  teacherGetAllClass,
} from '@/store/actions';
import { useRouter } from 'next/router';

const { TextArea } = Input;
export default function AddQuestionForm({ onEditForm, editData }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const [classOptions, setClassOptions] = useState([]);

  const onFinish = async (values) => {
    if (onEditForm) {
      onEditForm(values);
      return;
    }
    const { class_id, answer, question_link, name, duration, total_question } =
      values ?? {};
    if (answer.length < total_question) {
      return api.error({
        message: `Error`,
        description: 'Jumlah kunci jawaban kurang dari jumlah butir soal',
        placement: 'topRight',
      });
    }
    const payload = class_id?.map((el) => ({
      name,
      total_question,
      duration,
      answer,
      question_link,
      class_id: el,
    }));

    const { data: dataApi } = await dispatch(bulkAddQuestion(payload));
    if (dataApi) {
      api.success({
        message: `Success`,
        description: dataApi.message,
        placement: 'topRight',
      });
      router.push('/teacher/questionList');
    } else {
      api.error({
        message: `Error`,
        description: 'Gagal menambahkan data. Coba lagi',
        placement: 'topRight',
      });
    }
  };

  const fetchAllClass = async () => {
    const { data } = await dispatch(teacherGetAllClass());

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

  useEffect(() => {
    if (editData && onEditForm) {
      form.setFieldsValue(editData);
    }
  }, [onEditForm, editData]);

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item label="Mata Pelajaran" name="name">
          <Input placeholder="Mata Pelajaran" required />
        </Form.Item>
        <Form.Item label="Link Soal" name="question_link">
          <Input placeholder="Link Soal" required type="link" />
        </Form.Item>
        <Form.Item label="Kunci Jawaban" name="answer">
          <TextArea placeholder="Mata Pelajaran" required />
        </Form.Item>
        <Form.Item label="Kelas" name="class_id" required>
          <Select options={classOptions} mode={onEditForm ? '' : 'multiple'} />
        </Form.Item>
        <Form.Item label="Durasi" name="duration">
          <InputNumber placeholder="Durasi" required min={0} step={5} />
        </Form.Item>
        <Form.Item label="Jumlah Butir Soal" name="total_question">
          <InputNumber placeholder="Jumlah Butir Soal" required min={0} />
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

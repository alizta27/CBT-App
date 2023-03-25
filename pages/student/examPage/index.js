import React, { useEffect, useState } from 'react';
import {
  Drawer,
  FloatButton,
  notification,
  Radio,
  Grid,
  Space,
  Spin,
  Button,
  Divider,
} from 'antd';

import { getOneQuestion } from '@/store/actions/student';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { FormOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

export default function ExamPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const question_id = router.query;
  const [api, contextHolder] = notification.useNotification();
  const { md } = useBreakpoint();

  const [qustionLink, setQuestionLink] = useState(null);
  const [qustionTotal, setQustionTotal] = useState([null]);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    if (typeof window !== undefined) {
      const { innerHeight: height, innerWidth: width } = window;
      setHeight(height);
      setWidth(width);
    }
    // Client-side-only code
  });

  const fetchQuestion = async () => {
    const { data: dataApi } = await dispatch(getOneQuestion(question_id));
    if (dataApi) {
      const arr = new Array(dataApi.question?.total_question)
        .fill('')
        .map((_, i) => i + 1);

      setQuestionLink(dataApi.question?.question_link);
      setQustionTotal(arr);
    } else {
      api.error({
        message: `Error`,
        description: 'Gagal meload soal',
        placement: 'topRight',
      });
    }
  };

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (question_id) {
      fetchQuestion(question_id);
    }
  }, [question_id]);

  const onExamFinish = (value) => {
    console.log('val: ', value);
  };

  const ExamContent = () => {
    const [value, setValue] = useState({});
    const onChange = (e, number) => {
      const newValue = { ...value };
      newValue[number] = e.target.value;
      setValue(newValue);
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {qustionTotal.map((_, idx) => (
          <>
            <Space direction="horizontal" style={{ marginBottom: 10 }}>
              <p>{idx + 1}. </p>
              <Radio.Group
                onChange={(e) => onChange(e, idx + 1)}
                value={value[idx + 1]}
              >
                <Radio value={'a'}>A</Radio>
                <Radio value={'b'}>B</Radio>
                <Radio value={'c'}>C</Radio>
                <Radio value={'d'}>D</Radio>
              </Radio.Group>
            </Space>
            <Divider
              style={{
                marginTop: 5,
                marginBottom: 10,
              }}
            />
          </>
        ))}
        <Button
          type="primary"
          style={{ marginTop: 20 }}
          onClick={() => onExamFinish(value)}
        >
          Kumpul
        </Button>
      </div>
    );
  };

  return (
    <div>
      {contextHolder}
      {qustionLink ? (
        <iframe
          sandbox="allow-scripts allow-same-origin"
          height={height - 180}
          width={width - (md ? 700 : 400)}
          src={
            'https://drive.google.com/file/d/1731gwhmtVU1uM_PfAVOZjKuYPx3TO8Q7/preview'
          }
        ></iframe>
      ) : (
        // <iframe
        //   sandbox="allow-scripts allow-same-origin"
        //   src="https://drive.google.com/file/d/1731gwhmtVU1uM_PfAVOZjKuYPx3TO8Q7/preview"
        //   width="300"
        //   height="480"
        //   allow="autoplay"
        // ></iframe>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      )}
      <FloatButton
        onClick={toggleDrawer}
        icon={<FormOutlined />}
        type="default"
        style={{ right: 25, bottom: 20, background: '#BEF0CB' }}
      />
      <Drawer
        width={width - (md ? 700 : 90)}
        title="Jawaban"
        placement="right"
        onClose={toggleDrawer}
        open={open}
      >
        <ExamContent />
      </Drawer>
    </div>
  );
}

import React, { useEffect, useState, useRef } from 'react';
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
  Modal,
} from 'antd';

import {
  collectResult,
  getOneQuestion,
  initResult,
} from '@/store/actions/student';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Timer } from '@/components/Timer';

import style from './styles.module.scss';

const { useBreakpoint } = Grid;

export default function ExamPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const question_id = router.query;
  const [api, contextHolder] = notification.useNotification();
  const { md } = useBreakpoint();

  const [questionLink, setQuestionLink] = useState(null);
  const [qustionTotal, setQustionTotal] = useState([null]);
  const [examDuration, setExamDuration] = useState(null);
  const [resultId, setResultId] = useState('');
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [start, setStart] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState({});
  const [allowCollect, setAllowCollect] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const { innerHeight: height, innerWidth: width } = window;
      setHeight(height);
      setWidth(width);
    }
  });

  const fetchQuestion = async (question_id) => {
    const { data: dataApi } = await dispatch(getOneQuestion(question_id));
    if (dataApi) {
      const arr = new Array(dataApi.question?.total_question)
        .fill('')
        .map((_, i) => i + 1);

      setQuestionLink(dataApi.question?.question_link);
      setQustionTotal(arr);
      setExamDuration(dataApi.question?.duration);
    } else {
      api.error({
        description: 'Gagal meload soal',
        placement: 'topRight',
      });
    }
  };
  const refreshQuestion = async () => {
    const { data: dataApi } = await dispatch(getOneQuestion(question_id));
    if (dataApi) {
      setQuestionLink(dataApi.question?.question_link);
    } else {
      api.error({
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

  const hideModal = async () => {
    const { data: dataApi } = await dispatch(
      initResult({
        question_id: question_id.question_id,
        start_time: moment().unix(),
      })
    );
    if (dataApi) {
      setResultId(dataApi.id);
      setStart(true);
    } else {
      api.error({
        message: `Gagal`,
        description: 'Coba lagi',
        placement: 'topRight',
      });
      setOpen(false);
    }
  };

  const onExamFinish = async (value) => {
    let answer = '';

    if (Object.values(value).length !== qustionTotal.length) {
      api.warning({
        message: 'Silahkan jawab seluruh soal terlebih dahulu',
      });
      return;
    }
    if (!allowCollect) {
      api.warning({
        message: 'Anda belum mencukupi waktu minimal untuk mengumpulkan soal',
      });
      return;
    }

    for (let i = 1; i <= qustionTotal.length; i++) {
      if (value[i]) {
        answer += value[i];
      } else {
        answer += '-';
      }
    }
    await dispatch(
      collectResult(resultId, {
        answer,
        end_time: moment().unix(),
        question_id: question_id.question_id,
      })
    );
    router.push('/student/examList');
  };

  const ExamContent = () => {
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
          <React.Fragment key={idx}>
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
          </React.Fragment>
        ))}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="primary"
            style={{ marginTop: 20 }}
            onClick={() => onExamFinish(value)}
          >
            Kumpul
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {contextHolder}
      {questionLink ? (
        <>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: -15,
              marginBottom: 15,
            }}
          >
            {examDuration && start ? (
              <Timer
                deadline={moment().add(examDuration, 'm').toDate()}
                onFinish={() => onExamFinish(value)}
                allowCollect={setAllowCollect}
              />
            ) : (
              <p>Loading...</p>
            )}
            <Button type="primary" onClick={refreshQuestion}>
              Refresh Soal
            </Button>
          </div>
          <div className={style.container}>
            <iframe
              onLoad={() => setLoaded(true)}
              sandbox="allow-scripts allow-same-origin"
              height={height - 180}
              width={width - (md ? 300 : 400)}
              src={questionLink}
            />
            {open ? (
              <div
                className={style.answerContainer}
                style={{ height: height - 180 }}
              >
                <ExamContent />
              </div>
            ) : null}
          </div>
          <Modal
            open={!start}
            closable={false}
            footer={
              <Button
                size="small"
                type="primary"
                onClick={hideModal}
                disabled={!loaded}
              >
                Mulai
              </Button>
            }
          >
            <p>Berdoalah sebelum mengerjakan soal</p>
          </Modal>
        </>
      ) : (
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
      {/* <Drawer
        width={width - (md ? 700 : 90)}
        title="Jawaban"
        placement="right"
        onClose={toggleDrawer}
        open={open}
      >
        <ExamContent />
      </Drawer> */}
    </>
  );
}

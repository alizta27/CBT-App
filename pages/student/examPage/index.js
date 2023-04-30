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
  Row,
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
import LS_KEYS from '@/constant/localStorage';

import style from './styles.module.scss';

const { useBreakpoint } = Grid;

function NewExamPage({ isOld }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const question_id = router.query;
  const [api, contextHolder] = notification.useNotification();
  const { md } = useBreakpoint();
  // const clip = navigator.clipboard.read();

  const [questionLink, setQuestionLink] = useState(null);
  const [qustionTotal, setQustionTotal] = useState([null]);
  const [examDuration, setExamDuration] = useState(null);
  const [resultId, setResultId] = useState('');
  const [open, setOpen] = useState(true);
  // const [width, setWidth] = useState(600);
  // const [height, setHeight] = useState(600);
  const [start, setStart] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState({});
  const [allowCollect, setAllowCollect] = useState(false);
  const [finishStatus, setfinishStatus] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [studentBlurModal, setStudentBlurModal] = useState(false);
  const [forceFinish, setForceFinish] = useState(false);
  // const [clipStatus, setClipStatus] = useState('');
  const [studentBlur, setStudentBlur] = useState(0);
  // const [clipAlertCount, setClipAlertCount] = useState(0);
  // const [clipAlertModal, setClipAlertModal] = useState(false);

  const toggleCloseStudentBlurModal = () => {
    setStudentBlurModal(() => false);
  };
  const toggleOpenStudentBlurModal = () => {
    setStudentBlurModal(() => true);
  };

  const showModalAlert = () => {
    setfinishStatus(false);
    setOpenAlert(true);
  };
  const hideModalAlert = () => {
    setOpenAlert(false);
    setForceFinish(true);
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      showModalAlert();
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      const { innerHeight: height, innerWidth: width } = window;
      // setHeight(height);
      // setWidth(width);
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

      if (typeof window !== undefined) {
        localStorage.setItem(
          LS_KEYS.STUDENT_EXAM_QUESTION,
          dataApi.question?.question_link
        );
        localStorage.setItem(
          LS_KEYS.STUDENT_EXAM_TOTAL_QUESTION,
          JSON.stringify(arr)
        );
      }
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

  const hideModal = async () => {
    // resetClipBoard();
    const { data: dataApi } = await dispatch(
      initResult({
        question_id: question_id.question_id,
        start_time: moment().unix(),
      })
    );
    if (dataApi) {
      setResultId(dataApi.id);
      if (typeof window !== undefined) {
        localStorage.setItem(LS_KEYS.STUDENT_EXAM_RESULT_ID, dataApi.id);
      }
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

  const setOldData = () => {
    if (typeof window !== undefined) {
      const oldDuration = localStorage.getItem(LS_KEYS.STUDENT_EXAM_DURATION);
      const oldAnswer = localStorage.getItem(LS_KEYS.STUDENT_EXAM_ANSWER);
      const oldQuestion = localStorage.getItem(LS_KEYS.STUDENT_EXAM_QUESTION);
      const oldTotalQuestion = localStorage.getItem(
        LS_KEYS.STUDENT_EXAM_TOTAL_QUESTION
      );
      const oldResultId = localStorage.getItem(LS_KEYS.STUDENT_EXAM_RESULT_ID);
      const oldBlurCount = localStorage.getItem(
        LS_KEYS.STUDENT_EXAM_BLUR_COUNT
      );
      // const oldSsCount = localStorage.getItem(LS_KEYS.STUDENT_EXAM_SS_COUNT);

      setValue(JSON.parse(oldAnswer) ?? {});
      setExamDuration(+JSON.parse(oldDuration));
      setQuestionLink(oldQuestion ?? '');
      setQustionTotal(JSON.parse(oldTotalQuestion));
      setResultId(oldResultId);
      setStudentBlur(+oldBlurCount);
      // setClipAlertCount(+JSON.parse(oldSsCount));
    }
  };

  useEffect(() => {
    if (isOld) {
      setStart(true);
      setOldData();
    } else {
      if (question_id) {
        fetchQuestion(question_id);
      }
    }
  }, [isOld, question_id]);

  const clearStorage = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem(LS_KEYS.STUDENT_EXAM);
      localStorage.removeItem(LS_KEYS.STUDENT_EXAM_ANSWER);
      localStorage.removeItem(LS_KEYS.STUDENT_EXAM_DURATION);
      localStorage.removeItem(LS_KEYS.STUDENT_EXAM_RESULT_ID);
      localStorage.removeItem(LS_KEYS.STUDENT_EXAM_TOTAL_QUESTION);
      localStorage.removeItem(LS_KEYS.STUDENT_EXAM_QUESTION);
      localStorage.removeItem(LS_KEYS.STUDENT_EXAM_BLUR_COUNT);
      // localStorage.removeItem(LS_KEYS.STUDENT_EXAM_SS_COUNT);
    }
  };

  const onExamFinish = async (value) => {
    let answer = '';

    if (!forceFinish) {
      if (Object.values(value).length !== qustionTotal?.length) {
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
    }

    for (let i = 1; i <= qustionTotal?.length; i++) {
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
    clearStorage();
    router.push('/student/examList');
  };

  const ExamContent = () => {
    const onChange = (e, number) => {
      const newValue = { ...value };
      newValue[number] = e.target.value;
      setValue(newValue);
      if (typeof window !== undefined) {
        localStorage.setItem(
          LS_KEYS.STUDENT_EXAM_ANSWER,
          JSON.stringify(value)
        );
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {qustionTotal?.map((_, idx) => (
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

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem(LS_KEYS.STUDENT_EXAM, 1);
    }
  }, []);

  const onFocus = () => {
    if (studentBlur >= 0) {
      setStudentBlur((prevState) => {
        let count = prevState;
        return (count += 1);
      });
    }
  };

  const onBlur = () => {
    toggleOpenStudentBlurModal();
  };
  // const onVisibilitychange = () => {
  //   console.log('onVisibilitychange');
  // };

  // async function checkClipBoard() {
  //   try {
  //     const clipboard = await clip;
  //     const clipType = clipboard[0]?.types[0];
  //     if (clipType) setClipStatus(clipType);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // checkClipBoard();

  // useEffect(() => {
  //   if (clipStatus) {
  //     setClipAlertCount((prevState) => prevState + 1);
  //   }
  // }, [clipStatus]);

  // const resetClipBoard = () => {
  //   navigator.clipboard.writeText('');
  // };

  // useEffect(() => {
  //   resetClipBoard();
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     localStorage.setItem(LS_KEYS.STUDENT_EXAM_SS_COUNT, clipAlertCount);
  //   }
  //   if (start) {
  //     if (clipAlertCount > 0) {
  //       setClipAlertModal(true);
  //     } else if (clipAlertCount > 1) {
  //       setForceFinish(true);
  //     }
  //   }
  // }, [clipAlertCount, start]);

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem(LS_KEYS.STUDENT_EXAM_BLUR_COUNT, studentBlur);
    }
    if (studentBlur > 1) {
      setForceFinish(true);
    }
  }, [studentBlur]);
  // colect result when user go out of exam
  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // window.addEventListener('visibilitychange', onVisibilitychange);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      // window.removeEventListener('focus', onVisibilitychange);
    };
  }, []);

  // const listenSs = (e) => {
  //   if (e.key == 'PrintScreen') {
  //     navigator.clipboard.writeText('');
  //     alert('Screenshots disabled!');
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener('keyup', (e) => listenSs(e));
  //   return () => {
  //     window.removeEventListener('keyup', (e) => listenSs(e));
  //   };
  // }, []);

  useEffect(() => {
    if (forceFinish) {
      onExamFinish(value);
    }
  }, [forceFinish]);

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
                isOld={isOld}
                deadline={moment().add(examDuration, 'm').toDate()}
                onFinish={() => setForceFinish(true)}
                allowCollect={setAllowCollect}
              />
            ) : (
              <p>Loading...</p>
            )}
            <Button type="primary" onClick={refreshQuestion}>
              Refresh Soal
            </Button>
          </div>
          <div
            className={[
              md ? style.container : style.containerMobile,
              start ? '' : style.blur,
            ].join(' ')}
          >
            <div className={style.frameContainer}>
              <iframe
                onLoad={() => setLoaded(true)}
                sandbox="allow-scripts allow-same-origin"
                // height={md ? height - 180 : height - 350}
                // width={width - (md ? 300 : 400)}
                src={questionLink}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            {open && md ? (
              <div className={style.answerContainer}>
                <ExamContent />
              </div>
            ) : null}
          </div>
          <Modal
            open={!start && !isOld}
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
      {md ? (
        <FloatButton
          onClick={toggleDrawer}
          icon={<FormOutlined />}
          type="default"
          style={{ right: 25, bottom: 20, background: '#BEF0CB' }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={toggleDrawer}
            type="primary"
            style={{
              width: '70%',
              fontWeight: 'bold',
            }}
          >
            Jawab
          </Button>
        </div>
      )}
      <Modal
        title="Apakah Anda yakin?"
        open={openAlert}
        onOk={hideModalAlert}
        onCancel={hideModalAlert}
        okText="Ya, Saya yakin"
        cancelText="Kembali"
      >
        <p>Seluruh data ujian anda akan terhapus!</p>
      </Modal>
      <Modal
        title="Anda terdeteksi keluar dari halaman ujian!"
        open={studentBlurModal}
        onCancel={toggleCloseStudentBlurModal}
        footer={<Button onClick={toggleCloseStudentBlurModal}>Tutup</Button>}
      >
        <p>
          Ujian anda akan di batalkan jika anda tetap keluar dari halaman ujian.
        </p>
      </Modal>
      {/* <Modal
        title="Anda terdeteksi melakukan screen shoot!"
        open={clipAlertModal}
        onCancel={toggleCloseStudentBlurModal}
        footer={
          <Button
            onClick={() => {
              resetClipBoard();
              setClipAlertModal(false);
            }}
          >
            Tutup
          </Button>
        }
      >
        <p>
          Ujian anda akan di batalkan jika anda tetap melakukan screen
          shoot/mengcopy tulisan dari halaman ujian.
        </p>
      </Modal> */}
      {!md ? (
        <Drawer
          // width={width - (md ? 700 : 90)}
          title="Jawaban"
          placement="bottom"
          height={400}
          onClose={toggleDrawer}
          open={open}
        >
          <ExamContent />
        </Drawer>
      ) : null}
    </>
  );
}

export default function ExamPage() {
  const [examStatus, setExamStatus] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const exam = localStorage.getItem(LS_KEYS.STUDENT_EXAM);
      exam ? setExamStatus(1) : setExamStatus(0);
    }
  }, []);

  if (examStatus === null) {
    return (
      <Row justify="center">
        <Spin tip="Menyiapkan Ujian..." />
      </Row>
    );
  }

  return <NewExamPage isOld={examStatus === 0 ? false : true} />;
}

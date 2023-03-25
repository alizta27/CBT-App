import { useCallback, useEffect, useState } from 'react';
import { Modal, Button, notification } from 'antd';

import { ExportOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { CustomTable } from '@/components';

import {
  editClass,
  getAllClass,
  deleteClass as deleteClassAction,
} from '@/store/actions';

import styles from './styles.module.scss';
import AddClassForm from '@/components/form';
import {
  getStudentProfile,
  studentGetAllQuestion,
} from '@/store/actions/student';
import { useRouter } from 'next/router';

export default function ExamList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const [classData, setClassData] = useState([]);
  const [totalData, setTotalData] = useState(10);
  const [pageSize, setPageSize] = useState(10);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen((prevState) => !prevState);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      router.push({
        pathname: '/student/examPage',
        query: { name: 'Someone' },
      });
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const columns = [
    {
      title: 'Soal',
      dataIndex: 'question',
    },
    {
      title: 'Aksi',
      dataIndex: 'action',
    },
  ];

  const fetchData = async () => {
    const { data } = await dispatch(getStudentProfile());
    const { student } = data;

    if (student) {
      const { class_id } = student;
      const { data } = await dispatch(studentGetAllQuestion(class_id));

      if (data) {
        setTotalData(data.questions?.length ?? 10);
        const newData = data.questions?.map((el, i) => {
          return {
            key: i,
            question: el.name,
            action: (
              <div className={styles.buttonContainer}>
                <Button
                  type="primary"
                  onClick={() => {
                    router.push({
                      pathname: '/student/examPage',
                      query: { question_id: el.id },
                    });
                  }}
                >
                  <ExportOutlined />
                  Masuk
                </Button>
              </div>
            ),
          };
        });
        setClassData(newData);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {contextHolder}
      <CustomTable
        columns={columns}
        onChange={(e) => {
          const { pageSize } = e;
          setPageSize(pageSize);
        }}
        pageSize={pageSize}
        data={classData}
        total={totalData}
      />
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}

import { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Button,
  notification,
  Typography,
  Tag,
  Radio,
  Popover,
  Row,
  Space,
} from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { CustomTable } from '@/components';

import {
  editQuestion,
  getAllQuestion,
  deleteQuestion as deleteQuestionAction,
  setQuestionStatus,
} from '@/store/actions';

import AddQuestionForm from '@/components/form/AddQuestionForm';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function QuestionList() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const [classData, setClassData] = useState([]);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [totalData, setTotalData] = useState(10);
  const [pageSize, setPageSize] = useState(10);

  const toggleEditModal = useCallback(() => {
    setIsOpenEditModal((prevState) => !prevState);
  }, []);

  const deleteQuestion = async (id) => {
    const { data } = await dispatch(deleteQuestionAction(id));
    if (data) {
      fetchData();
      api.success({
        message: `Success`,
        description: data.message,
        placement: 'topRight',
      });
    } else {
      api.error({
        message: `Error`,
        description: 'Gagal mengupdate data. Coba lagi',
        placement: 'topRight',
      });
    }
  };

  const deleteClassModal = (id) => {
    Modal.warning({
      title: 'Apakah anda yakin?',
      content: 'Data yang anda hapus tidak dapat di kembalikan lagi',
      onOk: () => deleteQuestion(id),
      onCancel: () => {},
      okCancel: true,
    });
  };

  const onEditQuestion = async (value) => {
    const { data } = await dispatch(editQuestion(editData.id, value));
    if (data) {
      fetchData();
      api.success({
        message: `Success`,
        description: data.message,
        placement: 'topRight',
      });
      toggleEditModal();
    } else {
      api.error({
        message: `Error`,
        description: 'Gagal mengupdate data. Coba lagi',
        placement: 'topRight',
      });
      toggleEditModal();
    }
  };

  const columns = [
    {
      title: 'Link',
      dataIndex: 'link',
    },
    {
      title: 'Kelas',
      dataIndex: 'class',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Hasil',
      dataIndex: 'result',
    },
    {
      title: 'Aksi',
      dataIndex: 'action',
    },
  ];

  const changeStatus = async (status, id) => {
    const { data } = await dispatch(setQuestionStatus({ status, id }));
    if (data) {
      fetchData();
      api.success({
        message: `Success`,
        description: data.message,
        placement: 'topRight',
      });
    } else {
      api.error({
        message: `Error`,
        description: 'Gagal mengupdate status. Coba lagi',
        placement: 'topRight',
      });
    }
  };

  const fetchData = async () => {
    const { data } = await dispatch(getAllQuestion());

    if (data) {
      setTotalData(data.questions?.length ?? 10);
      const newData = data.questions?.map((el, i) => {
        let status = el.status;
        return {
          key: i,
          link: (
            <Text ellipsis style={{ width: 380 }}>
              <a href={el.question_link} target="_blank">
                {el.question_link}
              </a>
            </Text>
          ),
          class: `${el.Class.grade} - ${el.Class.name}`,
          status: (
            <Popover
              trigger="click"
              content={
                <Space size={10} direction="vertical">
                  <Row>
                    <Radio.Group onChange={(e) => (status = e.target.value)}>
                      <Radio value={1}>Aktif</Radio>
                      <Radio value={2}>Tidak Aktif</Radio>
                    </Radio.Group>
                  </Row>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => changeStatus(status, el.id)}
                  >
                    Simpan
                  </Button>
                </Space>
              }
            >
              <Tag color={el.status == 2 ? 'red' : 'green'}>
                {el.status == 2 ? 'tidak aktif' : 'aktif'}
              </Tag>
            </Popover>
          ),
          result: (
            <Button
              onClick={() => {
                setEditData({
                  id: el.id,
                  question_link: el.question_link,
                  answer: el.answer,
                });
                toggleEditModal();
              }}
            >
              Lihat Hasil
            </Button>
          ),
          action: (
            <div className={styles.buttonContainer}>
              <Button
                onClick={() => {
                  setEditData({
                    id: el.id,
                    question_link: el.question_link,
                    duration: el.duration,
                    name: el.name,
                    answer: el.answer,
                    class_id: el.class_id,
                  });
                  toggleEditModal();
                }}
              >
                <EditOutlined />
                Edit
              </Button>
              <Button
                danger
                onClick={() => {
                  deleteClassModal(el.id);
                }}
              >
                <DeleteOutlined />
                Hapus
              </Button>
            </div>
          ),
        };
      });
      setClassData(newData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {contextHolder}
      <CustomTable
        onChange={(e) => {
          const { pageSize } = e;
          setPageSize(pageSize);
        }}
        pageSize={pageSize}
        total={totalData}
        columns={columns}
        data={classData}
      />
      <Modal
        open={isOpenEditModal}
        title="Title"
        onOk={toggleEditModal}
        onCancel={toggleEditModal}
        footer={[
          <Button key="back" onClick={toggleEditModal}>
            Cancel
          </Button>,
        ]}
      >
        <AddQuestionForm onEditForm={onEditQuestion} editData={editData} />
      </Modal>
    </>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { Modal, Button, notification, Typography } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { CustomTable } from '@/components';

import {
  editClass,
  getAllQuestion,
  deleteClass as deleteClassAction,
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

  const toggleEditModal = useCallback(() => {
    setIsOpenEditModal((prevState) => !prevState);
  }, []);

  const deleteClass = async (id) => {
    const { data } = await dispatch(deleteClassAction(id));
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
      onOk: () => deleteClass(id),
      onCancel: () => {},
      okCancel: true,
    });
  };

  const onEditClass = async (value) => {
    const { data } = await dispatch(editClass(editData.id, value));
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
      title: 'Aksi',
      dataIndex: 'action',
    },
  ];

  const fetchData = async () => {
    const { data } = await dispatch(getAllQuestion());

    if (data) {
      const newData = data.questions?.map((el, i) => {
        return {
          key: i,
          link: (
            <Text ellipsis style={{ width: 500 }}>
              <a href={el.question_link} target="_blank">
                {el.question_link}
              </a>
            </Text>
          ),
          class: `${el.Class.grade} ${el.Class.name}`,
          action: (
            <div className={styles.buttonContainer}>
              <Button
                onClick={() => {
                  setEditData({
                    id: el.id,
                    name: el.name,
                    grade: el.grade,
                    total_student: el.total_student,
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
      <CustomTable columns={columns} data={classData} />;
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
        <AddQuestionForm onEditForm={onEditClass} editData={editData} />
      </Modal>
    </>
  );
}

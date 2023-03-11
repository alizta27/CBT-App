import { useCallback, useEffect, useState } from 'react';
import { Modal, Button, notification } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { CustomTable } from '@/components';

import {
  editTeacher,
  getAllTeacher,
  deleteTeacher as deleteTeacherAction,
} from '@/store/actions';

import styles from './styles.module.scss';
import AddTeacherForm from '@/components/form/AddTeacherForm';

export default function TeacherList() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const [classData, setClassData] = useState([]);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const toggleEditModal = useCallback(() => {
    setIsOpenEditModal((prevState) => !prevState);
  }, []);

  const deleteTeacher = async (id) => {
    const { data } = await dispatch(deleteTeacherAction(id));
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
      onOk: () => deleteTeacher(id),
      onCancel: () => {},
      okCancel: true,
    });
  };

  const onEditTeacher = async (value) => {
    const { data } = await dispatch(editTeacher(editData.id, value));
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
      title: 'Nama Lengkap',
      dataIndex: 'fullName',
    },
    {
      title: 'Mata Pelajaran',
      dataIndex: 'task',
    },
    {
      title: 'Username',
      dataIndex: 'userName',
    },
    {
      title: 'Aksi',
      dataIndex: 'action',
    },
  ];

  const fetchData = async () => {
    const { data } = await dispatch(getAllTeacher());

    if (data) {
      const newData = data.teachers?.map((el, i) => {
        return {
          key: i,
          fullName: el.full_name,
          task: el.task,
          userName: el.username,
          action: (
            <div className={styles.buttonContainer}>
              <Button
                onClick={() => {
                  setEditData({
                    id: el.id,
                    full_name: el.full_name,
                    task: el.task,
                    username: el.username,
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
        <AddTeacherForm onEditForm={onEditTeacher} editData={editData} isEdit />
      </Modal>
    </>
  );
}

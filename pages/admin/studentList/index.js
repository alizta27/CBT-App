import { useCallback, useEffect, useState } from 'react';
import { Modal, Button, notification } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { CustomTable } from '@/components';

import {
  editStudent,
  getAllStudent,
  deleteStudent as deleteStudentAction,
} from '@/store/actions';

import styles from './styles.module.scss';
import AddStudentForm from '@/components/form/AddStudentForm';

export default function StudentList() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const [classData, setClassData] = useState([]);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const toggleEditModal = useCallback(() => {
    setIsOpenEditModal((prevState) => !prevState);
  }, []);

  const deleteStudent = async (id) => {
    const { data } = await dispatch(deleteStudentAction(id));
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
      onOk: () => deleteStudent(id),
      onCancel: () => {},
      okCancel: true,
    });
  };

  const onEditStudent = async (value) => {
    const { data } = await dispatch(editStudent(editData.id, value));
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
      title: 'Kelas',
      dataIndex: 'className',
    },
    {
      title: 'Username',
      dataIndex: 'userName',
    },
    {
      title: 'Aksi',
      dataIndex: 'action',
      filterDropdown: <p>a</p>,
    },
  ];

  const fetchData = async () => {
    const { data } = await dispatch(getAllStudent());

    if (data) {
      const newData = data.students?.map((el, i) => {
        return {
          key: i,
          fullName: el.full_name,
          className: `${el.Class.grade} ${el.Class.name}`,
          userName: el.username,
          totalStudents: el.total_student,
          action: (
            <div className={styles.buttonContainer}>
              <Button
                onClick={() => {
                  setEditData({
                    id: el.id,
                    full_name: el.full_name,
                    class_id: el.class_id,
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
        <AddStudentForm onEditForm={onEditStudent} editData={editData} isEdit />
      </Modal>
    </>
  );
}

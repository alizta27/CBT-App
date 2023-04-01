import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Divider,
  notification,
  Modal,
  InputNumber,
} from 'antd';

import { CustomTable } from '@/components';

import { useDispatch } from 'react-redux';
import {
  createToken,
  listToken,
  deleteToken as actionDeleteToken,
} from '@/store/actions';
import AddExamForm from '@/components/form/AddExamForm';
import { genRandonString } from '@/utils/appHelper';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Text, Title } = Typography;

export default function CreateExam() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState('* * * * *');
  const [duration, setDuration] = useState(1);
  const [totalData, setTotalData] = useState(10);
  const [tokenData, setTokenData] = useState([]);

  const deleteToken = async (id) => {
    const { data } = await dispatch(actionDeleteToken(id));
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

  const deleteModal = (id) => {
    Modal.warning({
      title: 'Apakah anda yakin?',
      content: 'Data yang anda hapus tidak dapat di kembalikan lagi',
      onOk: () => deleteToken(id),
      onCancel: () => {},
      okCancel: true,
    });
  };

  const fetchData = async () => {
    const { data } = await dispatch(listToken());
    if (data) {
      setTotalData(data?.length ?? 10);
      const newData = data?.map((el, i) => {
        return {
          key: i,
          expire: el.expire,
          token: el.secret_token,
          id: el.id,
          action: (
            <Button
              danger
              onClick={() => {
                deleteModal(el.id);
              }}
            >
              <DeleteOutlined />
            </Button>
          ),
        };
      });
      setTokenData(newData);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    if (token === '* * * * *') {
      return;
    }
    if (!duration || duration === 0) {
      return;
    }
    const { data: dataApi } = await dispatch(
      createToken({
        secret_token: token,
        expire: moment().add(duration, 'hour').unix(),
      })
    );
    if (dataApi) {
      api.success({
        message: `Success`,
        description: dataApi.message,
        placement: 'topRight',
      });
      setToken('* * * * *');
      fetchData();
      handleCancel();
    } else {
      api.error({
        message: `Error`,
        description: 'Gagal menambahkan token. Coba lagi',
        placement: 'topRight',
      });
      handleCancel();
    }
  };

  const columns = [
    {
      title: 'Token',
      dataIndex: 'token',
    },
    {
      title: 'Expire',
      dataIndex: 'expire',
    },
    {
      title: 'Aksi',
      dataIndex: 'action',
    },
  ];

  const generateToken = useCallback(() => {
    const token = genRandonString(5);
    setToken(token);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {contextHolder}
      <Title level={2}>Tambah Token</Title>
      <Text>
        Tambah Data Token dengan mengisi form di bawah ini sebagai syarat
        mengikuti ujian.
      </Text>
      <Divider />
      <Row gutter={24}>
        {/* <Col span={12}>
          <Card title="Kelas" bordered={false}>
            <AddExamForm />
          </Card>
        </Col> */}
        <Col span={24}>
          <Card
            title="Token"
            bordered={false}
            extra={<Button onClick={showModal}>Buat Token</Button>}
          >
            <CustomTable columns={columns} data={tokenData} />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Buat Token"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={24} align="middle" justify="center">
          <Col span={24}>
            <p style={{ fontWeight: 700 }}>Token:</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                background: '#f0f0f0',
                padding: 5,
                borderRadius: 5,
                marginBottom: 20,
              }}
            >
              <p style={{ fontWeight: 700 }}>{token}</p>
            </div>
          </Col>
          <Col
            span={24}
            style={{
              marginBottom: 20,
            }}
          >
            <p style={{ fontWeight: 700 }}>Durasi:</p>
            <InputNumber
              value={duration}
              onChange={setDuration}
              min={1}
              max={24}
              addonAfter="Jam"
            />
          </Col>

          <Button size="small" type="primary" onClick={generateToken}>
            Generate
          </Button>
        </Row>
      </Modal>
    </>
  );
}

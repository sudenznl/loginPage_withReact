import React, { useState } from 'react';
import { Card, Col, Row, Modal, Table, message, Input } from 'antd';
import '../styles/HPCard.css';
import dayjs from 'dayjs';
import { dataSource, faultTrains, dailyMaintenanceTrains, kmTrains, getDetailColumnsByKey } from '../data/trains';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  TrenName: string;
  date?: string;
  kmLeft?: number;
  done?: boolean;
  note?: string;
}

const HPCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalColumns, setModalColumns] = useState<ColumnsType<DataType>>([]);
  const [modalData, setModalData] = useState<DataType[]>([]);
  const [dailyMaintenance, setDailyMaintenance] = useState<DataType[]>(dailyMaintenanceTrains);

  const today = dayjs();
  const oneWeekLater = today.add(7, 'day');

  const upcomingTrains = dataSource.filter(item =>
    item.date && dayjs(item.date).isAfter(today) && dayjs(item.date).isBefore(oneWeekLater)
  );

  const approachingKmTrains = kmTrains.filter(train => train.kmLeft !== undefined && train.kmLeft < 1500);

  const handleCheckboxChange = (key: React.Key) => {
    setDailyMaintenance(prev =>
      prev.map(train => {
        if (train.key === key) {
          const updated = { ...train, done: !train.done };
          if (updated.done) {
            message.success(`${updated.TrenName} treninin bakımı yapıldı ✅`);
          } 
          else {
            message.info(`${updated.TrenName} treninin bakımı bekliyor ⏳`);
          }
          return updated;
        }
        return train;
      })
    );

    setModalData(prev =>
      prev.map(train => {
        if (train.key === key) {
          const updated = { ...train, done: !train.done };
          if (updated.done) {
            message.success(`${updated.TrenName} treninin bakımı yapıldı ✅`);
          } 
          else {
            message.info(`${updated.TrenName} treninin bakımı bekliyor ⏳`);
          }
          return updated;
        }
        return train;
      })
    );
  };

  // Not için kullanılan fonksiyon :
  const handleNoteChange = (tableKey: string, rowKey: React.Key, value: string) => {
    setModalData(prev =>
      prev.map(train =>
        train.key === rowKey ? { ...train, note: value } : train
      )
    );
  };

  const showModal = (
    title: string,
    data: DataType[],
    key: 'maintenance' | 'fault' | 'daily' | 'km'
  ) => {
    let modalCols = getDetailColumnsByKey(key);

    if (key === 'daily') {
      modalCols = [
        { title: 'Tren Adı', dataIndex: 'TrenName', key: 'TrenName' },
        {
          title: 'Durum',
          dataIndex: 'done',
          key: 'done',
          render: (_: unknown, record: DataType) => (
            <label>
              <input
                type="checkbox"
                checked={record.done}
                onChange={() => handleCheckboxChange(record.key)}
              />
              {record.done ? "Yapıldı" : "Bekliyor"}
            </label>
          ),
        },
      ];
    }

    modalCols = [
      ...modalCols,
      {
        title: 'Not',
        dataIndex: 'note',
        key: 'note',
        render: (_: unknown, record: DataType) => (
          <Input.TextArea
            value={record.note || ""}
            onChange={e => handleNoteChange(key, record.key, e.target.value)}
            placeholder="Not ekleyin..."
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
        ),
      },
    ];

    setModalTitle(title);
    setModalData(data);
    setModalColumns(modalCols);
    setIsModalOpen(true);
  };

  return (
    <>
      <Row gutter={[16, 16]} className="card-row">
        <Col span={6}>
          <Card
            title={<span className="card-title blue">BAKIM TARİHİ YAKLAŞAN TRENLER</span>}
            className="custom-card"
            onClick={() => showModal("Bakım Tarihi Yaklaşan Trenler", upcomingTrains, "maintenance")}
            hoverable
          >
            <p>Bakım yapılması gereken trenlerin detayları burada yer alıyor.</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<span className="card-title red">ARIZALI TRENLER</span>}
            className="custom-card"
            onClick={() => showModal("Arızalı Trenler", faultTrains, "fault")}
            hoverable
          >
            <p>Arızalı trenlerin detayları burada yer alıyor.</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<span className="card-title green">GÜNLÜK BAKIM YAPILACAK TRENLER</span>}
            className="custom-card"
            onClick={() => showModal("Günlük Bakım Yapılacak Trenler", dailyMaintenance, "daily")}
            hoverable
          >
            <p>Günlük bakım yapılması gereken trenlerin detayları burada yer alıyor.</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<span className="card-title orange">KM YAKLAŞAN TRENLER</span>}
            className="custom-card"
            onClick={() => showModal("KM Yaklaşan Trenler", approachingKmTrains, "km")}
            hoverable
          >
            <p>Kilometresi yaklaşan trenlerin detayları burada yer alıyor.</p>
          </Card>
        </Col>
      </Row>

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={600}
      >
        <Table dataSource={modalData} columns={modalColumns} pagination={false} />
      </Modal>
    </>
  );
};

export default HPCard;

import React from 'react';
import { users } from '../data/user';
import { Table, Avatar } from 'antd';
import '../styles/UserProcess.css';

const getUserAvatar = (name: string, gender: "male" | "female") => (
  <Avatar
    className={gender === "male" ? "avatar-male" : "avatar-female"}
    size={32}
  >
    {name.split(" ").map(n => n[0]).join("").toUpperCase()}
  </Avatar>
);

//şimdilik güncelleme atıyoruz :
const userActions = [
  { userId: "u1", action: "Bakım notu ekledi", date: "2025-09-29 10:12" },
  { userId: "u2", action: "Arıza kaydı güncelledi", date: "2025-09-29 09:45" },
  { userId: "u3", action: "Günlük bakım işaretledi", date: "2025-09-28 17:30" },
  { userId: "u1", action: "Not düzenledi", date: "2025-09-28 15:20" }
];

const columns = [
  {
    title: "Kullanıcı",
    dataIndex: "userId",
    key: "userId",
    render: (userId: string) => {
      const user = users.find(u => u.id === userId && u.role === "yetkili");
      return user ? (
        <span className="user-cell">
          {getUserAvatar(user.name, user.gender)}
          {user.name}
        </span>
      ) : 
      (
        <span className="unknown-user">Bilinmeyen Kullanıcı</span>
      );
    }
  },
  {
    title: "İşlem",
    dataIndex: "action",
    key: "action"
  },
  {
    title: "Tarih",
    dataIndex: "date",
    key: "date"
  }
];

const UserProcess: React.FC = () => (
  <div className="user-process-container">
    <Table
      columns={columns}
      dataSource={userActions.map((item, idx) => ({ ...item, key: idx }))}
      pagination={false}
      bordered
      title={() => <span className="table-title">KULLANICI GÜNCELLEMELERİ</span>}
    />
  </div>
);

export default UserProcess;
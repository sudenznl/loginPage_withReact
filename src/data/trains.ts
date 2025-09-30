interface DataType {
    key: React.Key;
    TrenName: string;
    date?: string;
    kmLeft?: number;
    done?: boolean;
  }
  
  export const dataSource: DataType[] = [
    { key: '1', TrenName: 'Tren_1', date: '2025-09-29' },
    { key: '2', TrenName: 'Tren_2', date: '2025-09-30' },
    { key: '3', TrenName: 'Tren_3', date: '2025-10-01' },
    { key: '4', TrenName: 'Tren_4', date: '2025-10-02' },
    { key: '5', TrenName: 'Tren_5', date: '2025-10-09' },
    { key: '6', TrenName: 'Tren_6', date: '2025-10-15' },
    { key: '7', TrenName: 'Tren_7', date: '2025-10-19' },
    { key: '8', TrenName: 'Tren_8', date: '2025-10-23' },
  ];
  
  export const faultTrains: DataType[] = [
    { key: '1', TrenName: 'Tren_5' },
    { key: '2', TrenName: 'Tren_9' },
  ];
  
  export const dailyMaintenanceTrains: DataType[] = [
    { key: '1', TrenName: 'Tren_1', done: false },
    { key: '2', TrenName: 'Tren_2', done: true },
    { key: '3', TrenName: 'Tren_3', done: false },
    { key: '4', TrenName: 'Tren_4', done: false },
    { key: '5', TrenName: 'Tren_5', done: false },
    { key: '6', TrenName: 'Tren_6', done: true },
    { key: '7', TrenName: 'Tren_7', done: false },
    { key: '8', TrenName: 'Tren_8', done: true },
  ];
  
  export const kmTrains: DataType[] = [
    { key: '1', TrenName: 'Tren_1', kmLeft: 120 },
    { key: '2', TrenName: 'Tren_2', kmLeft: 3350 },
    { key: '3', TrenName: 'Tren_3', kmLeft: 2145 },
    { key: '4', TrenName: 'Tren_4', kmLeft: 5555 },
    { key: '5', TrenName: 'Tren_5', kmLeft: 6678 },
    { key: '6', TrenName: 'Tren_6', kmLeft: 509 },
    { key: '7', TrenName: 'Tren_7', kmLeft: 865 },
    { key: '8', TrenName: 'Tren_8', kmLeft: 444 },
  ];
  
export const getDetailColumnsByKey = (key: 'maintenance' | 'fault' | 'daily' | 'km') => {
  if (key === 'maintenance') {
    return [
      { title: 'Tren Adı', dataIndex: 'TrenName', key: 'TrenName' },
      { title: 'Tarih', dataIndex: 'date', key: 'date' },
    ];
  }
  if (key === 'fault') {
    return [
      { title: 'Tren Adı', dataIndex: 'TrenName', key: 'TrenName' },
    ];
  }
  if (key === 'daily') {
    return [
      { title: 'Tren Adı', dataIndex: 'TrenName', key: 'TrenName' },
      {
        title: 'Durum',
        dataIndex: 'done',
        key: 'done',
        render: (_: unknown, record: DataType): React.ReactNode => (
          record.done ? "Yapıldı" : "Bekliyor"
        ),
      },
    ];
  }
  return [
    { title: 'Tren Adı', dataIndex: 'TrenName', key: 'TrenName' },
    { title: 'Kalan KM', dataIndex: 'kmLeft', key: 'kmLeft' },
  ];
};
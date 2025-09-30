import React, { useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Table, Layout, AutoComplete, Input, Select, DatePicker, Dropdown, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../styles/HPTable.css';
import { Tooltip, Tag} from 'antd';

const { Header, Content } = Layout;

interface DataType 
{
  key: React.Key;
  fileName: string;
  responsible: string;
  date: string;
  lastUpdate: string;
}

const dataSource: DataType[] = 
[
  { key: '1', fileName: 'Rapor.pdf', responsible: 'Ahmet', date: '2025-09-01', lastUpdate: '2025-09-15' },
  { key: '2', fileName: 'Sunum.pptx', responsible: 'Ayşe', date: '2025-08-20', lastUpdate: '2025-09-10' },
  { key: '3', fileName: 'Veriler.xlsx', responsible: 'Mehmet', date: '2025-07-12', lastUpdate: '2025-08-30' },
  { key: '4', fileName: 'Toplanti_Notlari.docx', responsible: 'Elif', date: '2025-09-05', lastUpdate: '2025-09-18' },
  { key: '5', fileName: 'Planlama.csv', responsible: 'Burak', date: '2025-08-15', lastUpdate: '2025-09-02' },
  { key: '6', fileName: 'Analiz.pdf', responsible: 'Zeynep', date: '2025-07-30', lastUpdate: '2025-08-25' },
  { key: '7', fileName: 'Grafikler.pptx', responsible: 'Mustafa', date: '2025-09-10', lastUpdate: '2025-09-16' },
  { key: '8', fileName: 'KullaniciListesi.xlsx', responsible: 'Fatma', date: '2025-06-20', lastUpdate: '2025-07-25' },
  { key: '9', fileName: 'Yillik_Rapor.docx', responsible: 'Cem', date: '2025-08-01', lastUpdate: '2025-08-28' },
  { key: '10', fileName: 'Sunucu_Kayitlari.log', responsible: 'Deniz', date: '2025-09-12', lastUpdate: '2025-09-17' },
  { key: '11', fileName: 'Sunucu_Kayitlari2.log', responsible: 'Cem', date: '2025-08-12', lastUpdate: '2025-08-17' },
];

const getDaysDiff = (dateString: string): number => {
  const today = new Date();
  const target = new Date(dateString);
  const diffTime = today.getTime() - target.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

const uniqueValues = <T extends keyof DataType>(key: T): { text: string; value: string }[] =>
  Array.from(new Set(dataSource.map((item) => String(item[key]))))
    .map((val) => ({ text: val, value: val }));

const columns: TableColumnsType<DataType> = [

  {
    title: 'Dosya Adı',
    dataIndex: 'fileName',
    key: 'fileName',
    filterMode: 'tree',
    filterSearch: true,
    filters: uniqueValues('fileName'),
    onFilter: (value, record) => record.fileName.indexOf(value as string) === 0,
  },

  {
    title: 'Sorumlu Kişi',
    dataIndex: 'responsible',
    key: 'responsible',
    filterMode: 'tree',
    filterSearch: true,
    filters: uniqueValues('responsible'),
    onFilter: (value, record) => record.responsible === value,
  },

  {
    title: 'Tarih',
    dataIndex: 'date',
    key: 'date',
    filterMode: 'tree',
    filterSearch: true,
    filters: uniqueValues('date'),
    onFilter: (value, record) => record.date === value,
  },

  {
    title: 'Son Güncelleme Tarihi',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    render: (text: string) => {
      const daysDiff = getDaysDiff(text);
      let color = '';
      if (daysDiff <= 5) color = 'green';
      else if (daysDiff <= 15) color = 'orange';
      else color = 'red';
      return <span style={{ color }}>{text}</span>; },

  },

];

const App: React.FC = () => {

  const [filteredData, setFilteredData] = useState<DataType[]>(dataSource);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const options = dataSource.map((item) => ({
    value: item.fileName,
    label: item.fileName,
  }));

  const fileTypes = Array.from(new Set(dataSource.map((item) => item.fileName.split('.').pop() || '')));

  const handleSearch = (value: string) => {
    setSearchValue(value);
    filterData(value, selectedType, selectedDate);
  };

  const handleTypeChange = (value: string) => {
    if (value === 'all') 
    {
      setSelectedType(null);
      filterData(searchValue, null, selectedDate);
    } 
    else 
    {
      setSelectedType(value);
      filterData(searchValue, value, selectedDate);
    }
  };

  const handleDateChange = (date: Dayjs | null, dateString: string | string[]) => {
    setSelectedDate(dateString as string);
    filterData(searchValue, selectedType, dateString as string);
  };

  const filterData = (search: string, type: string | null, date: string | null) => {
    let result = dataSource;

    if (search) 
    {
      result = result.filter((item) => item.fileName.toLowerCase().includes(search.toLowerCase()));
    }

    if (type) 
    {
      result = result.filter((item) => item.fileName.toLowerCase().endsWith(type.toLowerCase()));
    }

    if (date) 
    {
      result = result.filter((item) => item.date === date);
    }

    setFilteredData(result);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "tablo.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const dataColumns = columns.filter(
      (col): col is typeof col & { dataIndex: keyof DataType } => 'dataIndex' in col
    );

    autoTable(doc, {
      head: [
        dataColumns.map(col => typeof col.title === "string" ? col.title : (col.title ? String(col.title) : ""))
      ],
      body: filteredData.map(row =>
        dataColumns.map(col => {
          const value = row[col.dataIndex as keyof DataType];
          return value !== undefined && value !== null ? String(value) : "";
        })
      ),
    });
    doc.save("tablo.pdf");
  };

  const downloadMenu = {
    items: [
      {
        key: 'pdf',
        label: 'PDF olarak indir',
        onClick: exportToPDF,
      },
      {
        key: 'excel',
        label: 'Excel olarak indir',
        onClick: exportToExcel,
      },
    ],
  };

  return (
    <Layout className="hpgraph-layout">
      <Header className="hpgraph-header">
        <AutoComplete className="search-box" options={options} onSelect={handleSearch} onChange={handleSearch}>
          <Input.Search size="large" placeholder="Dosya ara..." allowClear />
        </AutoComplete>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Select className="type-select" placeholder="Dosya tipi seç" style={{ width: 200 }} allowClear onChange={handleTypeChange}>
            <Select.Option key="all" value="all">Tüm Dosyalar</Select.Option>
            {fileTypes.map((type) => (<Select.Option key={type} value={type}>.{type} </Select.Option>))}
          </Select>

          <DatePicker className="Date-picker" onChange={handleDateChange} placeholder="Tarih seç" />
        </div>
      </Header>

      <Content className="hpgraph-content">
        <Table<DataType> columns={columns} dataSource={filteredData} pagination={false} />
      </Content>

      <div className="info-content">
        <div className="table-info">
          <div className="legend">
            <Tooltip title="Son 5 gün içinde güncellenmiş">
              <Tag color="green">● Son 5 Gün</Tag>
            </Tooltip>
            <Tooltip title="6-15 gün önce güncellenmiş">
              <Tag color="orange">● 6-15 Gün</Tag>
            </Tooltip>
            <Tooltip title="15 günden daha eski">
              <Tag color="red">● 15+ Gün</Tag>
            </Tooltip>
          </div>

          <Dropdown menu={downloadMenu} trigger={['click']}>
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size="middle">
              İndir
            </Button>
          </Dropdown>
        </div>
      </div>
      
    </Layout>
  );
};

export default App;
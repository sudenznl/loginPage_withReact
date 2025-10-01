import React from 'react';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
//import { dailyMaintenanceTrains } from '../data/trains';
import { dataSource } from '../data/trains';
import dayjs from 'dayjs';
import '../styles/HPBakimTakvimi.css';
import { HiPencilSquare } from "react-icons/hi2";


const dateCellRender = (value: Dayjs) => {
  // Bakım tarihi yaklaşan trenler 
  const maintenanceTrains = dataSource.filter(
    item => item.date && dayjs(item.date).isSame(value, 'day')
  );

  // Günlük bakım yapılması gereken trenler :
  //const dailyTrains = value.day() >= 1 && value.day() <= 5 ? dailyMaintenanceTrains : [];

  return (

    <div className="date-cell">

      {/* Bakım tarihi yaklaşan trenler */}
      {maintenanceTrains.length > 0 && (
        <div className="blue">
          <p>Bakım : {maintenanceTrains.map(train => train.TrenName).join(', ')}</p>
        </div>
      )}

      {/* Günlük bakım yapılması gereken trenler */}
      {/*
      {dailyTrains.length > 0 && (
       <div className="green">
        <p>
          <HiPencilSquare /> Günlük Bakım :
          {dailyTrains.map(train => (
            <span key={train.TrenName} style={{ display: 'block'}}>
              {train.TrenName}
            </span>
          ))}
        </p>
       </div>
      )}*/}

    </div>

  );
};

const HPBakimTakvimi: React.FC = () => {
  
  return (

    <div className="bakim-takvimi-container">
      <Calendar dateCellRender={dateCellRender} />
    </div>
    
  );

};

export default HPBakimTakvimi;



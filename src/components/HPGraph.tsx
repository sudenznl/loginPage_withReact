import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import '../styles/HPGraph.css';

//grafik için data :
const data = [
  { day: 'Pazartesi', iş_A: 6, iş_B: 3, iş_C: 4 },
  { day: 'Salı', iş_A: 5, iş_B: 4, iş_C: 2 },
  { day: 'Çarşamba', iş_A: 4, iş_B: 8, iş_C: 5 },
  { day: 'Perşembe', iş_A: 7, iş_B: 6, iş_C: 3 },
  { day: 'Cuma', iş_A: 3, iş_B: 7, iş_C: 5 },
  { day: 'Cumartesi', iş_A: 4, iş_B: 5, iş_C: 6 },
  { day: 'Pazar', iş_A: 8, iş_B: 6, iş_C: 4 },
];
    
const HPGraph = () => {
  return (
    <div className="graph-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis>
            <Label
              value="Saat"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle', fill: '#000000' }}
            />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="iş_A" fill="#CFE5FF" name="İş A" />
          <Bar dataKey="iş_B" fill="#7C1034" name="İş B" />
          <Bar dataKey="iş_C" fill="#252F9C" name="İş C" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HPGraph;

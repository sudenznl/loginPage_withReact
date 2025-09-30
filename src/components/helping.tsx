import React, { useRef } from 'react';
import '../styles/helping.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FilePdfOutlined, InfoCircleOutlined, CheckCircleOutlined, TableOutlined, BarChartOutlined, BulbOutlined } from '@ant-design/icons';

const Helping = () => {
  const docRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (docRef.current) {
      const canvas = await html2canvas(docRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('yardim_dokumani.pdf');
    }
  };

  return (
    <div className="helping-container" ref={docRef}>
      <div className="helping-header">
        <InfoCircleOutlined style={{ fontSize: 32, color: "#2a5d9f", marginRight: 12 }} />
        <h1>Tren Bakım Takip Sistemi Yardım</h1>
      </div>
      <div className="helping-welcome">
        <BulbOutlined style={{ fontSize: 24, color: "#fbc02d", marginRight: 8 }} />
        <span>
          Bu uygulama ile trenlerin bakım ve arıza durumlarını kolayca takip edebilirsiniz.<br />
          Aşağıda, ana sayfadaki bölümlerin ve özelliklerin nasıl kullanıldığını bulabilirsiniz.
        </span>
      </div>
      <div className="helping-sections">
        <div className="helping-box">
          <CheckCircleOutlined style={{ fontSize: 22, color: "#1976d2", marginRight: 8 }} />
          <b>Kartlar</b>
          <ul>
            <li>bu bölümde trenlerle ilgili özet bilgiler sunulur. Her bir kart; bakım zamanı yaklaşan trenler, arızalı trenler veya kilometre durumu gibi önemli verileri hızlıca görmenizi sağlar.</li>
          </ul>
        </div>
        <div className="helping-box">
          <BarChartOutlined style={{ fontSize: 22, color: "#e53935", marginRight: 8 }} />
          <b>Grafik</b>
          <ul>
            <li>Burada hangi iş için ne kadar çalışıldığı grafik üzerine yansıtılmıştır. Amacımız hangi işe ne kadar zaman ayrıldığını istatistiksel olarak gözlemlemektir.</li>
          </ul>
        </div>
        <div className="helping-box">
          <TableOutlined style={{ fontSize: 22, color: "#6d4c41", marginRight: 8 }} />
          <b>Tablo</b>
          <ul>
            <li>Sisteme yüklenen tüm dosyları tabloda görüntüleyebilirsiniz.Aynı zamanda istediğiniz dosyaya arama ve filtrleme özelliği daha hızlı ulaşabilirisiniz.</li>
            <li>Tabloyu sağ alt köşedeki indirme simgesine tıklayarak dökümanlar üzerinde yapılan değişiklikleri exxel/pdf formatında inceleyebilriniz.</li>
          </ul>
        </div>
      </div>
      <div className="helping-faq">
        <h3>Sıkça Sorulanlar</h3>
        <ul>
          <li><b>Bir trenin detayını nasıl görebilirim? :</b>Kartlardan ilgili kategoriyi tıklayarak o trenlerle ilgili detayları görebilirsiniz.</li>
        </ul>
      </div>
      <div className="helping-support">
        <h3>Yardım ve Destek</h3>
        <p>Herhangi bir sorun yaşarsanız veya öneriniz olursa, lütfen sistem yöneticinize veya destek ekibine başvurun.</p>
      </div>
      <div className="helping-download">
        <button className="helping-download-btn" onClick={handleDownloadPDF}>
          <FilePdfOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
          Yardım Dokümanını PDF olarak indir
        </button>
      </div>
    </div>
  );
};

export default Helping;
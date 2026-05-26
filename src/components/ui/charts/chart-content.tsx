import noData from '@/assets/images/no-chart-data.svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';
import Image from '../image/image';
import { Loader } from '../loader/loader';

type Props = {
  isEmpty: boolean;
  isLoading: boolean;
  children: React.ReactNode;
};

const MemoChartContent = ({ isEmpty, isLoading, children }: Props) => {
  if (isLoading) {
    return <Loader />;
  }
  if (!isLoading && isEmpty) {
    return (
      <div className="chart-container-no-data">
        <div className="chart-container-no-data__image">
          <Image className="image" src={noData} alt="no-data" />
        </div>
        <div className="chart-container-no-data__body">
          {getTranslatedValue('NoDataDisplayable')}
          {/* Henüz bir grafik çizilmedi. Grafik oluşturmak için cihazları ve grafik
          türlerini veya bir profil seçin ve “Grafik Oluştur” düğmesine tıklayın
          . */}
        </div>
      </div>
    );
  }
  return <div className="chart-content">{children}</div>;
};

const ChartContent = memo(MemoChartContent);

export default ChartContent;

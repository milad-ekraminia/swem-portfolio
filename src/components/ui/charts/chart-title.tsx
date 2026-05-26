import { DownloadIcon } from 'lucide-react';
import { memo } from 'react';
import { Button } from '../button/button';
import { ComponentLoader } from '../loader/component-loader/component-loader';

const MemoChartTitle = ({
  title,
  downloadHandler,
  children,
  loading = false,
}: {
  title: string;
  downloadHandler?: () => void;
  children?: React.ReactNode;
  loading?: any;
}) => {
  return children ? (
    <div className="chart-header">
      <h2 className="chart-header__title">{title}</h2>
      {children}
    </div>
  ) : (
    title && (
      <div className="chart-header">
        <h2 className="chart-header__title">{title}</h2>
        {downloadHandler && (
          <Button variant="secondary" onClick={downloadHandler} type="button">
            {loading ? (
              <ComponentLoader variant="secondary" />
            ) : (
              <DownloadIcon stroke="#344054" width={20} height={20} />
            )}
          </Button>
        )}
      </div>
    )
  );
};

const ChartTitle = memo(MemoChartTitle);

export default ChartTitle;

import { getTranslatedValue } from '@/helpers/get-translated-value';

interface CustomLegendProps {
  series?: number[];
  isLoading?: any;
}
const DonutCustomLegend = ({ series, isLoading }: CustomLegendProps) => {
  return (
    <div className="donut-chart info">
      <div className="donut-chart__legends">
        <div className="status">
          {isLoading ? (
            <>{getTranslatedValue('Loading')}</>
          ) : series?.length ? (
            <div className="status-items">
              {/* warning */}
              <div className="warning">
                <div className="dot"></div>
                {getTranslatedValue('Warning')} ({series?.[2]}%)
              </div>

              {/* critical */}
              <div className="orange">
                <div className="dot"></div>
                {getTranslatedValue('Critical')} ({series?.[1]}%)
              </div>

              {/* dangerous */}
              <div className="danger">
                <div className="dot"></div>
                {getTranslatedValue('Danger')} ({series?.[0]}%)
              </div>
            </div>
          ) : (
            <>{getTranslatedValue('ViewChart.SelectOption')}</>
          )}
        </div>

        {/* {series.map((serie, index) => {
          return (
            <div key={index + serie} className="donut-chart__legends__item">
              <div className="marker">
                <span
                  className="custom-legend-marker"
                  style={{
                    backgroundColor: colors[index],
                  }}
                ></span>
                <span className="custom-legend-label">{labels[index]}</span>
              </div>
              <p className="custom-legend-value">{serie}%</p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default DonutCustomLegend;

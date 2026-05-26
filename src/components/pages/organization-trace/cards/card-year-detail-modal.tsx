import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

export const CardYearDetailsModal = ({
  indCurrentYearActive1ExpCons,
  yearlyConsumption,
  yearlyProductionForecast,
  yearlyAccuracyRate,
  indCurrentYearActive1Revenue,
  normalAmortizationAmount,
  setShowModal,
}: any) => {
  return (
    <div className="card-detail-modal">
      <ModalHeader
        label={getTranslatedValue('Yearly.ProductionDetails')}
        setShowModal={setShowModal}
      />

      <div className="modal-body">
        <div className="item">
          <div className="title">
            {getTranslatedValue('IndCurrentYearActive1ExpCons')}
          </div>
          <div className="data">
            {formatNumberWithCommas(indCurrentYearActive1ExpCons, 2)} MWh
          </div>
        </div>

        <div className="item">
          <div className="title">
            {getTranslatedValue('consumption_comparison_yearly')}
          </div>
          <div className="data">
            {formatNumberWithCommas(yearlyConsumption, 2)} MWh
          </div>
        </div>

        <div className="item">
          <div className="title">
            {getTranslatedValue('Yearly.EstimatedProduction')}
          </div>
          <div className="data">
            {formatNumberWithCommas(yearlyProductionForecast, 2)} MWh
          </div>
        </div>

        <div className="item">
          <div className="title">
            {getTranslatedValue('Yearly.EstimatedProductionAccuracy')}
          </div>
          <div className="data">
            {formatNumberWithCommas(yearlyAccuracyRate, 0)}%
          </div>
        </div>

        <div className="item">
          <div className="title">{getTranslatedValue('Yearly.Revenue')}</div>
          <div className="data">
            {formatNumberWithCommas(indCurrentYearActive1Revenue, 2)}
          </div>
        </div>

        <div className="item">
          <div className="title">
            {getTranslatedValue('Yearly.DepreciationAmountRate')}
          </div>
          <div className="data">
            {formatNumberWithCommas(normalAmortizationAmount, 0)}%
          </div>
        </div>
      </div>
    </div>
  );
};

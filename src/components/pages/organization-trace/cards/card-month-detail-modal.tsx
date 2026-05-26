import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

export const CardMonthDetailsModal = ({
  indCurrentMonthActive1ExpCons,
  monthlyConsumption,
  monthlyProductionForecast,
  monthlyAccuracyRate,
  indCurrentMonthActive1Revenue,
  setShowModal,
}: any) => {
  return (
    <div className="card-detail-modal">
      <ModalHeader
        label={getTranslatedValue('Monthly.ProductionDetails')}
        setShowModal={setShowModal}
      />

      <div className="modal-body">
        <div className="item">
          <div className="title">
            {getTranslatedValue('IndCurrentMonthActive1ExpCons')}
          </div>
          <div className="data">
            {formatNumberWithCommas(indCurrentMonthActive1ExpCons, 2)} MWh
          </div>
        </div>

        <div className="item">
          <div className="title">
            {getTranslatedValue('IndMonthlyConsumption')}
          </div>
          <div className="data">
            {formatNumberWithCommas(monthlyConsumption, 2)} MWh
          </div>
        </div>

        <div className="item">
          <div className="title">
            {getTranslatedValue('Monthly.EstimatedProduction')}
          </div>
          <div className="data">
            {formatNumberWithCommas(monthlyProductionForecast, 2)} MWh
          </div>
        </div>

        <div className="item">
          <div className="title">
            {getTranslatedValue('Monthly.EstimatedProductionAccuracy')}
          </div>
          <div className="data">
            {formatNumberWithCommas(monthlyAccuracyRate, 0)}%
          </div>
        </div>

        <div className="item">
          <div className="title">{getTranslatedValue('Monthly.Revenue')}</div>
          <div className="data">
            {formatNumberWithCommas(indCurrentMonthActive1Revenue, 2)}
          </div>
        </div>
      </div>
    </div>
  );
};

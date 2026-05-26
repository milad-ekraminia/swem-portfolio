import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';


export const CardDayDetailsModal = ({
  indCurrentDayActive1ExpCons,
  dailyConsumption,
  dailyProductionForecast,
  dailyAccuracyRate,
  indCurrentDayActive1Revenue,
  setShowModal,
}: any) => {
  return (
    <div className="card-detail-modal">
      <ModalHeader
        label={getTranslatedValue('Daily.ProductionDetails')}
        setShowModal={setShowModal}
      />

      <div className="modal-body">
        <div className="item">
          <div className="title">
            {getTranslatedValue('IndCurrentDayActive1ExpCons')}
          </div>
          <div className="data">
            {formatNumberWithCommas(indCurrentDayActive1ExpCons, 2)} kWh
          </div>
        </div>

        <div className="item">
          <div className="title">
            {getTranslatedValue('Daily Consumption')}
          </div>
          <div className="data">
            {formatNumberWithCommas(dailyConsumption, 2)} kWh
          </div>
        </div>

        <div className="item">
          <div className="title">Estimated Production </div>
          <div className="data">
            {formatNumberWithCommas(dailyProductionForecast, 2)} kWh
          </div>
        </div>

        <div className="item">
          <div className="title">Estimated Production Accuracy </div>
          <div className="data">
            {formatNumberWithCommas(dailyAccuracyRate, 2)}
          </div>
        </div>

        <div className="item">
          <div className="title">Revenue</div>
          <div className="data">
            {formatNumberWithCommas(indCurrentDayActive1Revenue, 2)}
          </div>
        </div>
      </div>
    </div>
  );
};
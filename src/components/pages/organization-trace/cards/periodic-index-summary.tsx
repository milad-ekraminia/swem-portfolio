import { memo, useState } from 'react';
import { cardsTitle } from '@/enum-data/organization-trace/org-trace-index';
import { formatNumberWithCommas } from '@/helpers/format-number-with-commas';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchPeriodicIndexSummary } from '@/services/organization-trace';
import Card from '@/components/ui/cards/card';
import CardWithLoader from '@/components/ui/cards/card-with-loader';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { CardDayDetailsModal } from '@/components/pages/organization-trace/cards/card-day-detail-modal';
import { CardMonthDetailsModal } from '@/components/pages/organization-trace/cards/card-month-detail-modal';
import { CardYearDetailsModal } from '@/components/pages/organization-trace/cards/card-year-detail-modal';

const PeriodicIndexSummary = ({
  refetchInterval,
}: {
  refetchInterval?: number;
}) => {
  console.log("🚀 ~ PeriodicIndexSummary ~ refetchInterval:", refetchInterval)
  const treeData = useSelector((state: any) => state?.tree?.info);

  const [showDayModal, setShowDayModal] = useState<any>(null);
  const [showMonthModal, setShowMonthModal] = useState<any>(null);
  const [showYearModal, setShowYearModal] = useState<any>(null);

  const { data, isLoading, isPending } = useQuery({
    queryKey: ['Fetch periodic index summary', treeData?.tree_id],
    queryFn: () => fetchPeriodicIndexSummary({ tree_id: treeData?.tree_id }),
    retry: false,

  });
  // Defining Cards data for mapping
  const periodicDataMapping: {
    [key: string]: {
      titleValue: number;
      descValue: number;
    };
  } = {
    IndCurrentDayActive1ExpCons: {
      titleValue: data?.indCurrentDayActive1ExpCons ?? 0,
      descValue: data?.dailyProductionForecast ?? 0,
    },
    IndCurrentMonthActive1ExpCons: {
      titleValue:
        (data?.indCurrentMonthActive1ExpCons ?? 0) > 0
          ? (data?.indCurrentMonthActive1ExpCons ?? 0) / 1000
          : 0,
      descValue:
        (data?.monthlyProductionForecast ?? 0) > 0
          ? (data?.monthlyProductionForecast ?? 0) / 1000
          : 0,
    },
    IndCurrentYearActive1ExpCons: {
      titleValue:
        (data?.indCurrentYearActive1ExpCons ?? 0) > 0
          ? (data?.indCurrentYearActive1ExpCons ?? 0) / 1000
          : 0,
      descValue:
        (data?.yearlyProductionForecast ?? 0) > 0
          ? (data?.yearlyProductionForecast ?? 0) / 1000
          : 0,
    },
  };

  const showDetailHandler = (title: string) => {
    // console.log(title)
    if (title === 'IndCurrentDayActive1ExpCons') setShowDayModal(true);
    else if (title === 'IndCurrentMonthActive1ExpCons') setShowMonthModal(true);
    else if (title === 'IndCurrentYearActive1ExpCons') setShowYearModal(true);
  };

  return cardsTitle()
    .slice(1)
    .map((card) => {
      const { titleValue, descValue } = periodicDataMapping[card.title];
      const percentage = (titleValue / descValue) * 100;
      return (
        <>
          {isLoading || isPending ? (
            <CardWithLoader />
          ) : (
            <Card
              key={card.title}
              title={card.title}
              count={formatNumberWithCommas(titleValue, 2)}
              parametre={card.unit}
              percent={percentage}
              periodicCount={formatNumberWithCommas(descValue, 2)}
              chartStatus={true}
              type={'progressbar'}
              showDetailHandler={showDetailHandler}
            />
          )}
          {showDayModal && (
            <Modal
              isOpen={showDayModal}
              onClose={() => setShowDayModal(null)}
              showCloseButton={false}
            >
              <CardDayDetailsModal
                dailyAccuracyRate={data?.dailyAccuracyRate}
                dailyConsumption={data?.dailyConsumption}
                dailyProductionForecast={data?.dailyProductionForecast}
                indCurrentDayActive1ExpCons={data?.indCurrentDayActive1ExpCons}
                indCurrentDayActive1Revenue={data?.indCurrentDayActive1Revenue}
                setShowModal={setShowDayModal}
              />
            </Modal>
          )}

          {showMonthModal && (
            <Modal
              isOpen={showMonthModal}
              onClose={() => setShowMonthModal(null)}
              showCloseButton={false}
            >
              <CardMonthDetailsModal
                indCurrentMonthActive1ExpCons={
                  (data?.indCurrentMonthActive1ExpCons ?? 0) > 0
                    ? (data?.indCurrentMonthActive1ExpCons ?? 0) / 1000
                    : 0
                }
                indCurrentMonthActive1Revenue={
                  (data?.indCurrentMonthActive1Revenue ?? 0) > 0
                    ? (data?.indCurrentMonthActive1Revenue ?? 0) / 1000
                    : 0
                }
                monthlyAccuracyRate={data?.monthlyAccuracyRate}
                monthlyConsumption={data?.monthlyConsumption}
                monthlyProductionForecast={
                  (data?.monthlyProductionForecast as any) / 1000
                }
                setShowModal={setShowMonthModal}
              />
            </Modal>
          )}

          {showYearModal && (
            <Modal
              isOpen={showYearModal}
              onClose={() => setShowYearModal(null)}
              showCloseButton={false}
            >
              <CardYearDetailsModal
                indCurrentYearActive1ExpCons={
                  (data?.indCurrentYearActive1ExpCons ?? 0) > 0
                    ? (data?.indCurrentYearActive1ExpCons ?? 0) / 1000
                    : 0
                }
                indCurrentYearActive1Revenue={
                  (data?.indCurrentYearActive1Revenue ?? 0) > 0
                    ? (data?.indCurrentYearActive1Revenue ?? 0) / 1000
                    : 0
                }
                normalAmortizationAmount={data?.normalAmortizationAmount}
                yearlyAccuracyRate={data?.yearlyAccuracyRate}
                yearlyConsumption={data?.yearlyConsumption}
                yearlyProductionForecast={
                  (data?.yearlyProductionForecast as any) / 1000
                }
                setShowModal={setShowYearModal}
              />
            </Modal>
          )}
        </>
      );
    });
};
export default memo(PeriodicIndexSummary);

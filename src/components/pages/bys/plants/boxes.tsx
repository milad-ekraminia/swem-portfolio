import { memo } from 'react';
import { ArrowRightSvg } from '@/assets/icons/arrow-right-svg';
import { ArrowLeftSvg } from '@/assets/icons/arrow-left-svg';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCookie } from '@/helpers/cookies';
import { Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button/button';
import Image from '@/components/ui/image/image';
import { Loader } from '@/components/ui/loader/loader';
import StatusTag from '@/components/ui/status-tag/status-tag';

const PlantsBoxView = ({
  data,
  isLoading,
  onEdit,
}: {
  data: any;
  isLoading: boolean;
  onEdit: (id: string) => void;
}) => {
  const navigate = useNavigate();
  const isRTL = getCookie('CultureName') === 'fa';

  return (
    <>
      {!isLoading ? (
        <div className="box-view">
          {data?.items?.map((item: any, index: number) => {
            return (
              <div
                key={`plant-${item?.warehouse?.id}-${index}`}
                className="plant-box"
              >
                <div className="plant-box__img">
                  <Image
                    src={`/uploads/plant-images/${item?.warehouse?.imageUri}`}
                    alt={item?.warehouse?.name}
                    className="w-full h-[200px] object-cover rounded-t-xl"
                  />
                </div>

                <div className="plant-box__detail">
                  <span className="plant-box__detail__name">
                    {item?.warehouse?.name}
                  </span>

                  <span className="plant-box__detail__address">
                    {item?.warehouse?.address}
                  </span>

                  <StatusTag
                    label={
                      item?.warehouse?.status
                        ? getTranslatedValue('Active')
                        : getTranslatedValue('Passive')
                    }
                    color={item?.warehouse?.status ? 'success' : 'danger'}
                  />
                </div>

                <div className="plant-box__actions">
                  {getPermission('WebNet.Plants.Edit') && (
                    <Button
                      variant="secondary"
                      onClick={() => onEdit(item?.warehouse?.id)}
                    >
                      <Edit2 stroke="var(--brand-600)" size={20} />
                    </Button>
                  )}

                  {getPermission('WebNet.Plants.Management') && (
                    <Button
                      variant="secondary-blue"
                      onClick={() =>
                        navigate(
                          `/bys/plants/${item?.warehouse?.id}/inventories`,
                        )
                      }
                    >
                      <div className="inventories">
                        {getTranslatedValue('Inventories')}
                        {isRTL ? (
                          <ArrowLeftSvg stroke="var(--brand-600)" />
                        ) : (
                          <ArrowRightSvg stroke="var(--brand-600)" />
                        )}
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="loader">
          <Loader />
        </div>
      )}
    </>
  );
};

export default memo(PlantsBoxView);

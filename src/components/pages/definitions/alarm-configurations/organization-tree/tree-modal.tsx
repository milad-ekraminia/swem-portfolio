import { useState } from 'react';
import { CloseSvg } from '@/assets/icons/close-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { fetchTreeDataApi } from '@/services/general/tree-api';
import { Button } from '@/components/ui/button/button';
import SkeletonLoader from '@/components/ui/skeleton/skeleton-loader';
import AlarmConfigurationsFilterProfileTree from './filter-profile-tree';

const AlarmConfigurationsOrganizationTreeModal = ({
  setIsVisible,
  setValue,
  fieldName,
}: {
  setIsVisible: (data: boolean) => void;
  setValue: any;
  fieldName?: string;
}) => {
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['fetch tree data api'],
    queryFn: () => fetchTreeDataApi(),
    retry: false,
  });

  const handleOrganizationSelect = () => {
    setValue('selectedOrganizations', selectedItems);
    setValue(
      fieldName || 'alarmConfDeviceIds',
      selectedItems?.map((item: any) => item.id),
    );
    setIsVisible(false);
    setSelectedItems([]);
  };

  return (
    <div className="edit-alarm-configuration-modal">
      <div className="edit-alarm-configuration-modal__header">
        <span className="edit-alarm-configuration-modal__header-title">
          {getTranslatedValue('Organization')}
        </span>
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
          }}
        >
          <CloseSvg />
        </button>
      </div>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <AlarmConfigurationsFilterProfileTree
          data={data}
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
        />
      )}
      <div className="edit-alarm-configuration-modal__footer">
        {/* <Button
          variant="secondary"
          type="button"
          onClick={() => {
          }}
        >
          {getTranslatedValue("Cancel")}
        </Button> */}
        <Button
          type="button" // ⛔ prevent default form submit
          variant="primary"
          onClick={handleOrganizationSelect}
        >
          {getTranslatedValue('Approve')}
        </Button>
      </div>
    </div>
  );
};

export default AlarmConfigurationsOrganizationTreeModal;

import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useWatch } from 'react-hook-form';
import useLabelByDevice from '@/hooks/use-label-by-device';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';

interface Props {
  detailControl: any;
  setValue: any;
  errors: any;
}

const MemoDeviceAndLabelBox = ({ detailControl, setValue, errors }: Props) => {
  const LabelId = useWatch({
    control: detailControl,
    name: 'LabelId',
  });
  const DeviceId: any = useWatch({
    control: detailControl,
    name: 'DeviceId',
  });

  const { devices, labels, isLoading } = useLabelByDevice({
    deviceId: DeviceId,
  });
  return (
    <>
      <div className="dv-plant-detail__body-table__body-column-cell">
        <SearchableDropdown
          name="DeviceId"
          // label={getTranslatedValue("em_multi_conditional_device")}
          searchParameterLabel={'title'}
          isLoading={isLoading}
          options={devices?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
            disabled: item.disabled,
          }))}
          selectedVal={
            DeviceId
              ? (devices?.find((item: any) => item.id == DeviceId)
                  ?.displayName ?? '')
              : ''
          }
          placeholder={getTranslatedValue('Search')}
          handleChange={(selectedValue: any) =>
            setValue('DeviceId', selectedValue)
          }
          error={errors?.DeviceId?.message}
        />
      </div>
      <div className="dv-plant-detail__body-table__body-column-cell">
        <SearchableDropdown
          name="LabelId"
          // label={getTranslatedValue("em_multi_conditional_label")}
          searchParameterLabel={'title'}
          isLoading={isLoading}
          options={labels?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
            disabled: item.disabled,
          }))}
          selectedVal={
            LabelId
              ? getTranslatedValue(
                  labels?.find((item: any) => item.id == LabelId)
                    ?.displayName ?? '',
                )
              : ''
          }
          placeholder={getTranslatedValue('Search')}
          handleChange={(selectedValue: any) =>
            setValue('LabelId', selectedValue)
          }
          error={errors?.LabelId?.message}
        />
      </div>
    </>
  );
};

const DeviceAndLabelBox = memo(MemoDeviceAndLabelBox);

export default DeviceAndLabelBox;

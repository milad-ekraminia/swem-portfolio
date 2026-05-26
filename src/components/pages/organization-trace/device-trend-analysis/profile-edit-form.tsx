import { CloseSvg } from '@/assets/icons/close-svg';
import { SearchSvg } from '@/assets/icons/search-svg';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { Input } from '@/components/ui/input/Input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import Tabs from '@/components/ui/tabs/tabs';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ProfileFormData } from '@/types/pages/organization-trace';
import { filterProfileValidation } from '@/validations/organization-trace/device-trend-analysis';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface Device {
  id: number;
  displayName: string;
  [key: string]: any;
}
interface Props {
  onClose: () => void;
  CHART_TYPES: string[];
  colors: string[];
  data: any[];
  profile: any;
}
export default function ProfileEditForm({
  onClose,
  CHART_TYPES,
  colors,
  data,

  profile,
}: Props) {
  const [activeSubTab, setActiveSubTab] = useState<string>(CHART_TYPES[0]);
  const [isAllDevicesSelected, setIsAllDevicesSelected] =
    useState<boolean>(false);
  const [devices, setDevices] = useState<Device[]>([]);

  const [isAllTypesSelected, setIsAllTypesSelected] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(filterProfileValidation) as any,
  });
  const onSubmit = (data: ProfileFormData) => {
    //   TODO -> Create a Mutation for this action and add the api logic
    console.log(data);
  };
  useEffect(() => {
    reset({
      selectedChartTypes: profile.selectedChartTypes.map((type: any) => ({ type })),
      selectedDevices: profile.selectedDevices.map((device: any) => ({
        _id: device,
      })),
      name: profile.title,
    });
  }, [profile]);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'selectedDevices',
  });

  const {
    fields: selectedChartType,
    append: appendSelectedChartType,
    remove: removeSelectedChartType,
    replace: replaceSelectedChartType,
  } = useFieldArray({
    control,
    name: 'selectedChartTypes',
  });
  console.log(fields, selectedChartType)

  const handleSelectChartType = useCallback(
    (chart: string) => {
      const idx = selectedChartType.findIndex(
        (field: any) => field.type === chart,
      );
      if (idx === -1) appendSelectedChartType({ type: chart });
      else removeSelectedChartType(idx);
    },
    [selectedChartType, appendSelectedChartType, removeSelectedChartType],
  );
  const handleSelectDevice = useCallback(
    (device: any) => {
      if (!fields.find((field: any) => field._id === device.id)) {
        append({ ...device, _id: device.id });
      }
    },
    [fields, append],
  );

  const handleSelectAllDevices = () => {
    if (isAllDevicesSelected) {
      setIsAllDevicesSelected(false);
      replace([]);
    } else {
      const formattedDevices = devices.map((device: any) => ({
        ...device,
        _id: device.id,
      }));
      replace(formattedDevices);
      setIsAllDevicesSelected(true);
    }
  };
  useEffect(() => {
    if (data?.length) {
      setDevices(data
        .filter((item: any) => {
          return profile.selectedDevices.includes(item.id);
        }));

    }
  }, [data]);

  const handleSelectAllTypes = () => {
    if (isAllTypesSelected) {
      setIsAllTypesSelected(false);
      replaceSelectedChartType([]);
    } else {
      replaceSelectedChartType(CHART_TYPES.map((type) => ({ type })));
      setIsAllTypesSelected(true);
    }
  };
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      if (value.length && data) {
        setDevices(
          data.filter((device: Device) => device.displayName.includes(value)),
        );
      } else if (data) {
        const selectedIds = fields.map((field: any) => field._id);
        const selectedItems = data.filter((device: Device) =>
          selectedIds.includes(device.id),
        );
        setDevices(selectedItems.length ? selectedItems : data.slice(0, 20));
      }
    },
    [data, fields],
  );
  const handleRemoveDevice = useCallback(
    (id: number) => {
      const itemIndex = fields.findIndex((item: any) => item._id === id);
      if (itemIndex !== -1) remove(itemIndex);
    },
    [fields, remove],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="global-modal profile-edit"
    >
      <ModalHeader
        isSave={true}
        label={getTranslatedValue('Profili kaydedin')}
        setShowModal={onClose}
      />
      <div className="derived-values-form-content">
        <RegisterInput
          name="name"

          label={getTranslatedValue('ProfileName')}
          placeholder={getTranslatedValue('ProfileName')}
          type="text"
          error={errors?.name?.message}
          register={register}
          required
        />
        <div className="accordion-content">
          <Tabs
            tabs={CHART_TYPES.map((type) => ({
              title: getTranslatedValue(type),
              value: type,
            }))}
            activeTab={activeSubTab}
            onTabClick={setActiveSubTab}
          />
          <div className="chart-type-options">
            {CHART_TYPES.map((type) => (
              <div
                key={type}
                onClick={() => handleSelectChartType(type)}
                className={`${selectedChartType.find((field: any) => field.type === type) ? 'active' : ''} chart-type-options__option`}
              >
                {getTranslatedValue(type)}
                <Checkbox
                  checked={
                    !!selectedChartType.find(
                      (field: any) => field.type === type,
                    )
                  }
                  onChange={() => { }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Toggle
              isOn={isAllTypesSelected}
              setIsOn={handleSelectAllTypes}
              label={getTranslatedValue('SelectAll')}
            />
          </div>
        </div>
        <div className="accordion-content">
          <Input
            leftIcon={<SearchSvg />}
            style={{ width: '600px' }}
            onChange={handleSearch}
            placeholder={getTranslatedValue('search')}
          />
          <div className="devices-list">
            {devices.map((device, index) => (
              <div
                key={device.id}
                onClick={() => handleSelectDevice(device)}
                className={`devices-list__device ${fields.find((field: any) => field._id === device.id) ? 'selected' : ''}`}
              >
                <span
                  style={{ background: colors[index] }}
                  className="color"
                ></span>
                {device.displayName}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveDevice(device.id);
                  }}
                >
                  <CloseSvg />
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Toggle
              isOn={isAllDevicesSelected}
              setIsOn={handleSelectAllDevices}
              label={getTranslatedValue('SelectAll')}
            />
          </div>
        </div>
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
          reset();
        }}
        isPending={false}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
}

import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  deviceSensorTableSchema,
  deviceSensorTableSchemaType,
} from '@/validations/definitions/devices/sensore-device-table';
import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { Loader } from '@/components/ui/loader/loader';

const MemoDeviceEditableTable = ({
  control,
  isLoading = false,
  getDeviceLabelResponse,
}: {
  control: Control<any>;
  isLoading?: boolean;
  getDeviceLabelResponse: any;
}) => {
  const PlantDetailFields = [
    getTranslatedValue('Label'),
    getTranslatedValue('PinNr'),
    getTranslatedValue('Description'),
    getTranslatedValue('Unit'),
    getTranslatedValue('Action'),
  ];

  const {
    handleSubmit,
    // reset,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<deviceSensorTableSchemaType>({
    resolver: yupResolver(deviceSensorTableSchema),
    defaultValues: {
      labelId: 0,
      pin_Nr: 0,
      description: '',
      unit: '',
    },
  });

  const { fields, append, remove } = useFieldArray<{
    organizationPlantDetails: deviceSensorTableSchemaType[];
  }>({
    control,
    name: 'organizationPlantDetails',
  });

  const handleAddOrganizationPlantDetail = (data: any) => {
    append({
      labelId: data.labelId,
      pin_Nr: data.pin_Nr,
      description: data.description,
      unit: data.unit,
    });

    setValue('labelId', 0);
    setValue('pin_Nr', 0);
    setValue('description', '');
    setValue('unit', '');
  };

  const handleRemoveDetail = (index: number) => {
    remove(index);
  };

  return (
    <div className="dv-plant-detail dv-organization-modal__content-input-full">
      <div className="dv-plant-detail__body">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="dv-plant-detail__body-table">
            <div className="dv-plant-detail__body-table__header">
              {PlantDetailFields.map((field) => (
                <div
                  key={field}
                  className="dv-plant-detail__body-table__header-cell"
                >
                  <span className="dv-plant-detail__body-table__header-cell-title">
                    {field}
                  </span>
                </div>
              ))}
            </div>

            <div className="dv-plant-detail__body-table__body">
              {fields?.length > 0 &&
                fields.map((field, index) => {
                  return (
                    <div
                      key={field.id}
                      className="dv-plant-detail__body-table__body-column dv-plant-detail__body-table__body-column-list"
                    >
                      <span className="dv-plant-detail__body-table__body-column-cell">
                        {field.labelId ? field?.labelId : ''}
                      </span>
                      <span className="dv-plant-detail__body-table__body-column-cell">
                        {field.pin_Nr}
                      </span>
                      <span className="dv-plant-detail__body-table__body-column-cell">
                        {field.description}
                      </span>
                      <span className="dv-plant-detail__body-table__body-column-cell">
                        {field.unit}
                      </span>
                      <div className="dv-plant-detail__body-table__body-column-cell">
                        <button
                          className="dv-plant-detail__body-table__body-column-cell-button"
                          type="button"
                          onClick={() => handleRemoveDetail(index)}
                        >
                          <Trash2 color="#F04438" size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}

              <div className="dv-plant-detail__body-table__body-column">
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <RegisterSelectInput
                    name="labelId"
                    options={
                      getDeviceLabelResponse?.data?.items?.length > 0
                        ? getDeviceLabelResponse?.data?.items?.map(
                            (item: any) => ({
                              value: item?.id,
                              title: item?.displayName,
                            }),
                          )
                        : []
                    }
                    error={errors?.labelId?.message}
                    register={register}
                    // title={getTranslatedValue(
                    //   "em_device_hourly_data_calculation_profile_desc"
                    // )}
                    control={control}
                  />
                </div>
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <RegisterSelectInput
                    name="pin_Nr"
                    options={[]}
                    error={errors?.pin_Nr?.message}
                    register={register}
                    // title={getTranslatedValue(
                    //   "em_device_hourly_data_calculation_profile_desc"
                    // )}
                    control={control}
                  />
                </div>
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <RegisterInput
                    type="text"
                    name="description"
                    error={errors?.description?.message}
                    register={register}
                    placeholder="-"
                  />
                </div>
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <RegisterInput
                    type="text"
                    name="unit"
                    error={errors?.unit?.message}
                    register={register}
                    placeholder="-"
                  />
                </div>
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <button
                    className="dv-plant-detail__body-table__body-column-cell-button"
                    type="button"
                    onClick={handleSubmit(handleAddOrganizationPlantDetail)}
                    disabled={
                      !watch('labelId') ||
                      !watch('pin_Nr') ||
                      !watch('description') ||
                      !watch('unit')
                    }
                  >
                    <CirclePlus color="var(--brand-600)" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DeviceEditableTable = memo(MemoDeviceEditableTable);

export default DeviceEditableTable;

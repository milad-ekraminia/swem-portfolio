import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { Loader } from '@/components/ui/loader/loader';
import {
  subscriptionTopicEnum,
  subscriptionTopicEnumOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  brokerSubscriberInfosSchema,
  brokerSubscriberInfosSchemaType,
} from '@/validations/definitions/access-points/access-point-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus, Trash2 } from 'lucide-react';
import { memo } from 'react';
import { Control, useFieldArray, useForm } from 'react-hook-form';

const MemoMqttBrokerField = ({
  control,
  isLoading,
}: {
  control: Control<any>;
  isLoading?: boolean;
}) => {
  const PlantDetailFields = [
    getTranslatedValue('SubscriptionTopic'),
    getTranslatedValue('SubscriptionTopicQos'),
    getTranslatedValue('Action'),
  ];

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    control: mqttControl,
  } = useForm<brokerSubscriberInfosSchemaType>({
    resolver: yupResolver(brokerSubscriberInfosSchema) as any,
    defaultValues: {
      subscriptionTopic: '',
      subscriptionTopicQos: 0,
    },
  });

  const { fields, append, remove } = useFieldArray<{
    brokerSubscriberInfos: brokerSubscriberInfosSchemaType[];
  }>({
    control,
    name: 'brokerSubscriberInfos',
  });

  const handleAddOrganizationPlantDetail = (data: any) => {
    append({
      subscriptionTopic: data.subscriptionTopic,
      subscriptionTopicQos: data.subscriptionTopicQos,
    });
    setValue('subscriptionTopic', '');
    setValue('subscriptionTopicQos', 0);
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
                        {field.subscriptionTopic}
                      </span>
                      <span className="dv-plant-detail__body-table__body-column-cell">
                        {getTranslatedValue(
                          subscriptionTopicEnum[
                          field.subscriptionTopicQos as keyof typeof subscriptionTopicEnum
                          ],
                        )}
                      </span>
                      <div className="dv-plant-detail__body-table__body-column-cell">
                        <button
                          type="button"
                          onClick={() => handleRemoveDetail(index)}
                          className="dv-plant-detail__body-table__body-column-cell-button"
                        >
                          <Trash2 color="#F04438" size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}

              <div className="dv-plant-detail__body-table__body-column">
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <RegisterInput
                    type="text"
                    name="subscriptionTopic"
                    label=""
                    error={errors?.subscriptionTopic?.message}
                    maxLength={50}
                    register={register}
                  />
                </div>
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <RegisterSelectInput
                    name="subscriptionTopicQos"
                    label=""
                    options={subscriptionTopicEnumOptions}
                    error={errors?.subscriptionTopicQos?.message}
                    isLoading={false}
                    register={register}
                    control={mqttControl}
                  />
                </div>
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <button
                    className="dv-add-to-table-button"
                    type="button"
                    onClick={handleSubmit(handleAddOrganizationPlantDetail)}
                  >
                    <CirclePlus color="var(--brand-600)" size={20} />
                    {/* <span>{getTranslatedValue("Add")}</span> */}
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

const MqttBrokerField = memo(MemoMqttBrokerField);

export default MqttBrokerField;

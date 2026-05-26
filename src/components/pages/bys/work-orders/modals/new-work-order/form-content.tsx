import Accordion from '@/components/ui/accordion/accordion';
import DateInput from '@/components/ui/input/date-input/date-input';
import OrganizationInput from '@/components/ui/input/organization-picker/organization-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { workNotificationPriorityTypeList } from '@/enum-data/bys/bys-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { displayNameListItemType } from '@/types/pages/definitions/multi-conditional-statuses';
import { memo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import LogsTable from '../preview-modal/logs-table/table';

const MemoWorkOrderFormContent = ({
  register,
  errors,
  setValue,
  control,
  workOrdersTypeLookup,
  categoryLookup,
  userLookup,
  isAllDisabled,
  workOrderInfo,
}: {
  register: any;
  errors: any;
  setValue: any;
  control: any;
  workOrderInfo?: any;
  workOrdersTypeLookup: displayNameListItemType[];
  userLookup: displayNameListItemType[];
  categoryLookup: displayNameListItemType[];
  isEdit?: boolean;
  isShowContent?: boolean;
  organizationsLookup?: displayNameListItemType[];
  deviceLookup?: displayNameListItemType[];
  organizationId?: number;
  deviceId?: number;
  isAllDisabled?: boolean;
}) => {
  const workOrderStartDateTime = useWatch({
    control,
    name: 'workOrderStartDateTime',
  });
  const workOrderEndDateTime = useWatch({
    control,
    name: 'workOrderEndDateTime',
  });
  const [selectedAccordion, setSelectedAccordion] = useState<any>(1);
  const accordionHandler = (id: number) => {
    const isSelected = selectedAccordion === id ? null : id;
    setSelectedAccordion(isSelected);
  };
  return (
    <div className="add-work-order-form-content">
      <div className="grid">
        <RegisterInput
          name="workOrderNo"
          label={getTranslatedValue('WorkOrderNo')}
          type={'text'}
          required={true}
          disabled
          error={errors?.workOrderNo?.message}
          register={register}
        />

        <RegisterSelectInput
          name="workOrderType"
          label={getTranslatedValue('WorkOrderType')}
          options={workOrdersTypeLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          disabled={isAllDisabled}
          register={register}
          control={control}
          error={errors?.workOrderType?.message}
        />

        <RegisterSelectInput
          name="workOrderCategory"
          label={getTranslatedValue('WorkOrderCategory')}
          options={categoryLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          disabled={isAllDisabled}
          register={register}
          control={control}
          error={errors?.workOrderCategory?.message}
        />

        <RegisterSelectInput
          name="workOrderPriority"
          label={getTranslatedValue('WorkOrderPriority')}
          options={workNotificationPriorityTypeList?.map((item: any) => ({
            value: item.id,
            title: item.value,
          }))}
          register={register}
          disabled={isAllDisabled}
          control={control}
          error={errors?.workOrderPriority?.message}
        />

        <OrganizationInput
          isMulti={false}
          name="deviceId"
          disabled={isAllDisabled}
          control={control}
          onChange={(value) => setValue('deviceId', value as number)}
          assetTypeIdChange={(value) =>
            setValue('workOrderAssetType', value as number)
          }
        />

        <RegisterInput
          name="workOrderDescription"
          required
          disabled={isAllDisabled}
          label={getTranslatedValue('WorkOrderDescription')}
          type={'text'}
          error={errors?.workOrderDescription?.message}
          register={register}
        />

        {/* <DateInput
          label={getTranslatedValue("WorkOrderStartDateTime")}
          name="workOrderStartDateTime"
          disabled={isAllDisabled}
          dateFormat={"DD/MM/YYYY"}
          onChange={(value: any) => {
            if (!isAllDisabled) {
              setValue("workOrderStartDateTime", value);
            }
          }}
          value={workOrderStartDateTime}
          periodType={"2"}
          placeHolder={getTranslatedValue("Date")}
        /> */}

        <DateInput
          label={getTranslatedValue('WorkOrderEndDateTime')}
          name="workOrderEndDateTime"
          disabled={isAllDisabled}
          dateFormat={'DD/MM/YYYY'}
          onChange={(value: any) => {
            if (!isAllDisabled) {
              setValue('workOrderEndDateTime', value);
            }
          }}
          value={workOrderEndDateTime}
          periodType={'2'}
          placeHolder={getTranslatedValue('Date')}
          minDate={new Date(workOrderStartDateTime)}
        />

        <RegisterSelectInput
          name="workOrderAssignedUserId"
          label={getTranslatedValue('WorkOrderAssignedUserId')}
          options={userLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          required
          disabled={isAllDisabled}
          register={register}
          control={control}
          error={errors?.workOrderAssignedUserId?.message}
        />

        {workOrderInfo && (
          <Accordion
            id={1}
            title={getTranslatedValue('ActionLog')}
            isSelected={selectedAccordion}
            clickHandler={accordionHandler}
          >
            {selectedAccordion === 1 ? (
              <LogsTable
                workOrderId={workOrderInfo.id}
                userLookup={userLookup}
              />
            ) : null}
          </Accordion>
        )}
      </div>
    </div>
  );
};

const WorkOrderFormContent = memo(MemoWorkOrderFormContent);
export default WorkOrderFormContent;

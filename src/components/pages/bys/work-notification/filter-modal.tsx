import { Button } from '@/components/ui/button/button';
import DateInput from '@/components/ui/input/date-input/date-input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { workNotificationStatusTypeList } from '@/enum-data/bys/work-notifications';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

interface Props {
  onClose: () => void;
  open: boolean;
  types: any[];
  users: any[];
  filters: any;
  onChange: (filters: any) => void;
}

export default function FilterModal({
  onClose,
  filters,
  open,
  onChange,
  types,
  users,
}: Props) {
  const { control, register, reset, getValues, setValue } = useForm<any>();

  useEffect(() => {
    reset(filters);
  }, [filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = {
      workNotificationTypeId: getValues('workNotificationTypeId'),
      AssignedUserId: getValues('AssignedUserId'),
      CreationTimeMin: getValues('minStartDate'),
      CreationTimeMax: getValues('maxStartDate'),
      EndDateMin: getValues('minEndDate'),
      EndDateMax: getValues('maxEndDate'),
      workNotificationStatusType: getValues('workNotificationStatusType'),
    };

    onChange(filters);
    onClose();
  };

  const handleClearFilter = () => {
    const filters = {};

    onChange(filters);
    onClose();
  };

  const minEndDate = useWatch({
    control,
    name: 'minEndDate',
  });

  const minStartDate = useWatch({
    control,
    name: 'minStartDate',
  });

  return (
    <Modal
      modalSize="md"
      isOpen={open}
      onClose={onClose}
      showCloseButton={false}
    >
      <ModalHeader
        label={getTranslatedValue('filter')}
        isFunnel={true}
        setShowModal={() => onClose()}
      />
      <form onSubmit={handleSubmit}>
        <div className="notification-form-content">
          <div className="row">
            <RegisterSelectInput
              name="workNotificationTypeId"
              label={getTranslatedValue('WorkNotificationType')}
              placeholder={getTranslatedValue('WorkNotificationType')}
              options={formatSelectOptionsWithoutItems(types)}
              register={register}
              control={control}
            />

            <RegisterSelectInput
              name="AssignedUserId"
              label={getTranslatedValue('WorkOrderAssignedUser')}
              options={formatSelectOptionsWithoutItems(users)}
              register={register}
              placeholder={getTranslatedValue('WorkOrderAssignedUser')}
              control={control}
            />
            <DateInput
              name="minStartDate"
              label={getTranslatedValue('WorkOrderMinCreationDate')}
              hasMax
              dateFormat="DD/MM/YYYY"
              value={getValues('minStartDate')}
              onChange={(value) => setValue('minStartDate', value)}
              periodType="2"
            />
            <DateInput
              name="maxStartDate"
              label={getTranslatedValue('WorkOrderMaxCreationDate')}
              hasMax
              dateFormat="DD/MM/YYYY"
              value={getValues('maxStartDate')}
              onChange={(value) => setValue('maxStartDate', value)}
              periodType="2"
              minDate={new Date(minStartDate)}
            />
            <DateInput
              name="minEndDate"
              label={getTranslatedValue('WorkOrderMinEndDate')}
              hasMax
              dateFormat="DD/MM/YYYY"
              value={getValues('minEndDate')}
              onChange={(value) => setValue('minEndDate', value)}
              periodType="2"
            />
            <DateInput
              name="maxEndDate"
              label={getTranslatedValue('WorkOrderMaxEndDate')}
              dateFormat="DD/MM/YYYY"
              value={getValues('maxEndDate')}
              onChange={(value) => setValue('maxEndDate', value)}
              periodType="2"
              minDate={new Date(minEndDate)}
            />
            <RegisterSelectInput
              name="workNotificationStatusType"
              label={getTranslatedValue('WorkNotificationStatusType')}
              placeholder={getTranslatedValue('WorkNotificationStatusType')}
              options={formatSelectOptionsWithoutItems(
                workNotificationStatusTypeList,
              )}
              register={register}
              control={control}
            />
          </div>
        </div>

        <div className="dv-submit-or-cancel-buttons action-buttons">
          <Button
            type="button"
            style={{ width: 'fit-content' }}
            onClick={handleClearFilter}
            variant="secondary"
          >
            {getTranslatedValue('Clear', 'AbpUi.texts')}
          </Button>

          <Button
            type="button"
            style={{ width: 'fit-content' }}
            onClick={onClose}
            variant="secondary"
          >
            {getTranslatedValue('cancel')}
          </Button>

          <Button
            style={{ width: 'fit-content' }}
            type="submit"
            variant="primary"
          >
            {getTranslatedValue('Save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

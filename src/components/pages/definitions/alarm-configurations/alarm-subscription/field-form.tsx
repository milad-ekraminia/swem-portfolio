import SendOrCancelButtons from '@/components/ui/button/send-or-cancel-button';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import {
  userNotificationPeriodTypeOptions,
  userNotificationTypeOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  userAlarmConfigurationsInitialValues,
  userAlarmConfigurationsSchema,
} from '@/validations/definitions/alarm-configurations/alarm-configurations-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const MemoAlarmSubscriptionFieldFormContent = ({
  usersLookupResponse,
  onAdd,
  onClose,
}: {
  usersLookupResponse: any[];
  onAdd: (value: any) => void;
  onClose: (value: any) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>({
    resolver: yupResolver(userAlarmConfigurationsSchema),
    defaultValues: userAlarmConfigurationsInitialValues,
  });

  const userId = useWatch({
    control,
    name: 'userId',
  });

  const onSubmit = (formData: any) => {
    onAdd(formData);
  };

  return (
    <div className="edit-alarm-configuration-modal">
      <ModalHeader
        label={
          getTranslatedValue('em_alarm_configuration') +
          ' ' +
          getTranslatedValue('Add')
        }
        setShowModal={() => {
          onClose(null);
        }}
      />

      <div className="alarm-subscription-field-form-content">
        <RegisterSelectInput
          name="userId"
          label={getTranslatedValue('em_user_login_name')}
          options={(usersLookupResponse || [])?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          error={errors?.userId?.message as string}
          isLoading={false}
          register={register}
          control={control}
        />

        <RegisterSelectInput
          name="notificationType"
          label={getTranslatedValue('em_user_notification_type')}
          options={userNotificationTypeOptions}
          error={errors?.notificationType?.message as string}
          isLoading={false}
          register={register}
          control={control}
        />

        <RegisterSelectInput
          name="notificationPeriod"
          label={getTranslatedValue('em_user_notification_period')}
          options={userNotificationPeriodTypeOptions}
          error={errors?.notificationPeriod?.message as string}
          isLoading={false}
          register={register}
          control={control}
        />
      </div>

      {/* <div className="edit-alarm-configuration-modal__footer"> */}
      <SendOrCancelButtons
        handleSubmitForm={handleSubmit(onSubmit)}
        handleCancelForm={() => {
          onClose(null);
        }}
        isPending={false}
        isSubmitDisabled={!userId}
      />
    </div>
  );
};

const AlarmSubscriptionFieldFormContent = memo(
  MemoAlarmSubscriptionFieldFormContent,
);

export default AlarmSubscriptionFieldFormContent;

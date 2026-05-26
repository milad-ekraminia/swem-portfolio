import { Button } from '@/components/ui/button/button';
import DateInput from '@/components/ui/input/date-input/date-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { yesOrNoList } from '@/enum-data/system-administration/system-administration-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  userFilterModalInitialValues,
  userFilterModalResolver,
  userFilterModalValuesTypes,
} from '@/validations/system-administration/definitions/users-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

interface Props {
  onClose: () => void;
  open: boolean;
  // onChange: (filters: any) => void
  filterSubmitHandler: any;
  roles: { id: string; name: string }[];
  availableOrganizationUnits: { id: string; displayName: string }[];
  filterValues: any;
}

export default function UsersFilterModal({
  onClose,
  open,
  // onChange,
  filterSubmitHandler,
  roles,
  availableOrganizationUnits,
  filterValues,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue: setValueFromHookForm,
  } = useForm<userFilterModalValuesTypes>({
    resolver: yupResolver(userFilterModalResolver as any),
    defaultValues:
      Object.keys(filterValues).length > 0
        ? filterValues
        : userFilterModalInitialValues,
  });

  useEffect(() => {
    reset(filterValues);
  }, [filterValues]);

  // const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const filters = {
  //         workNotificationTypeId: getValues("workNotificationTypeId"),
  //         createdBy: getValues("CreatedBy"),
  //         minStartDate: getValues("minStartDate"),
  //         maxStartDate: getValues("maxStartDate"),
  //         minEndDate: getValues("minEndDate"),
  //         maxEndDate: getValues("maxEndDate"),
  //         workNotificationStatusType: getValues("workNotificationStatusType")
  //     };

  //     onChange(filters);
  //     onClose();
  // };

  const handleClearFilter = () => {
    const filters = {};

    filterSubmitHandler(filters);
    onClose();
  };

  const RoleId = useWatch({
    control,
    name: 'RoleId',
  });
  const OrganizationUnitId = useWatch({
    control,
    name: 'OrganizationUnitId',
  });
  const MinCreationTime = useWatch({
    control,
    name: 'MinCreationTime',
  });
  const MaxCreationTime = useWatch({
    control,
    name: 'MaxCreationTime',
  });
  const MinModifitionTime = useWatch({
    control,
    name: 'MinModifitionTime',
  });
  const MaxModifitionTime = useWatch({
    control,
    name: 'MaxModifitionTime',
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
      <form
        onSubmit={handleSubmit((data) => {
          filterSubmitHandler(data);
        })}
      >
        <div className="users-filter-content">
          <SearchableDropdown
            name={'RoleId'}
            label={getTranslatedValue('Role', 'AbpIdentity.texts')}
            searchParameterLabel={'title'}
            options={roles?.map((item: any) => ({
              value: item.id,
              title: item.name,
            }))}
            selectedVal={roles?.find((item: any) => item.id == RoleId)?.name}
            placeholder={getTranslatedValue('Search')}
            handleChange={(e: any) => {
              setValueFromHookForm('RoleId', e);
            }}
            isLoading={false}
          />

          <SearchableDropdown
            name={'OrganizationUnitId'}
            label={getTranslatedValue('OrganizationUnit', 'AbpIdentity.texts')}
            searchParameterLabel={'title'}
            options={availableOrganizationUnits?.map((item: any) => ({
              value: item.id,
              title: item.displayName,
            }))}
            selectedVal={
              availableOrganizationUnits?.find(
                (item: any) => item.id == OrganizationUnitId,
              )?.displayName
            }
            placeholder={getTranslatedValue('Search')}
            handleChange={(e: any) => {
              setValueFromHookForm('OrganizationUnitId', e);
            }}
            isLoading={false}
          />

          <RegisterInput
            type={'text'}
            name={'userName'}
            label={getTranslatedValue('UserName', 'AbpIdentity.texts')}
            error={errors?.userName?.message}
            register={register}
          />

          <RegisterInput
            type={'number'}
            name={'phoneNumber'}
            label={getTranslatedValue('PhoneNumber', 'AbpIdentity.texts')}
            error={errors?.phoneNumber?.message}
            register={register}
          />

          <DateInput
            label={getTranslatedValue('CreationStartDate', 'AbpIdentity.texts')}
            name="MinCreationTime"
            dateFormat={'YYYY-MM-DD'}
            onChange={(e: any) => setValueFromHookForm('MinCreationTime', e)}
            value={MinCreationTime ?? new Date()}
            periodType={'2'}
          />

          <DateInput
            label={getTranslatedValue('CreationEndDate', 'AbpIdentity.texts')}
            name="MaxCreationTime"
            dateFormat={'YYYY-MM-DD'}
            onChange={(e: any) => setValueFromHookForm('MaxCreationTime', e)}
            value={MaxCreationTime ?? new Date()}
            periodType={'2'}
          />

          <DateInput
            label={getTranslatedValue(
              'ModificationStartDate',
              'AbpIdentity.texts',
            )}
            name="MinModifitionTime"
            dateFormat={'YYYY-MM-DD'}
            onChange={(e: any) => setValueFromHookForm('MinModifitionTime', e)}
            value={MinModifitionTime ?? new Date()}
            periodType={'2'}
          />

          <DateInput
            label={getTranslatedValue(
              'ModificationEndDate',
              'AbpIdentity.texts',
            )}
            name="MaxModifitionTime"
            dateFormat={'YYYY-MM-DD'}
            onChange={(e: any) => setValueFromHookForm('MaxModifitionTime', e)}
            value={MaxModifitionTime ?? new Date()}
            periodType={'2'}
          />

          <RegisterInput
            type={'text'}
            name={'EmailAddress'}
            label={getTranslatedValue('EmailAddress', 'AbpIdentity.texts')}
            error={errors?.EmailAddress?.message}
            register={register}
          />

          <RegisterInput
            type={'text'}
            name={'Name'}
            label={getTranslatedValue('Name', 'AbpIdentity.texts')}
            error={errors?.Name?.message}
            register={register}
          />

          <RegisterInput
            type={'text'}
            name={'Surname'}
            label={getTranslatedValue('Surname', 'AbpIdentity.texts')}
            error={errors?.Surname?.message}
            register={register}
          />

          <RegisterSelectInput
            name={'NotActive'}
            label={getTranslatedValue('NotActive', 'AbpIdentity.texts')}
            options={yesOrNoList}
            error={errors?.NotActive?.message}
            register={register}
            control={control}
          />

          <RegisterSelectInput
            name={'EmailConfirmed'}
            label={getTranslatedValue('EmailConfirmed', 'AbpIdentity.texts')}
            options={yesOrNoList}
            error={errors?.EmailConfirmed?.message}
            register={register}
            control={control}
          />

          <RegisterSelectInput
            name={'IsLockedOut'}
            label={getTranslatedValue('IsLockedOut', 'AbpIdentity.texts')}
            options={yesOrNoList}
            error={errors?.IsLockedOut?.message}
            register={register}
            control={control}
          />

          <RegisterSelectInput
            name={'IsExternal'}
            label={getTranslatedValue('IsExternal', 'AbpIdentity.texts')}
            options={yesOrNoList}
            error={errors?.IsExternal?.message}
            register={register}
            control={control}
          />
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

import { memo, useState } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useWatch } from 'react-hook-form';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';

const MemoUserInformation = ({
  errors,
  register,
  control,
  setValue,
  userOrganizationProfileLookup,
  mimicProfilesLookup,
  organizationLookup,
  isEdit = false,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  userOrganizationProfileLookup: any;
  mimicProfilesLookup: any;
  organizationLookup: any;
  isEdit?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const AppUserMimicProfileId = Number(
    useWatch({
      control,
      name: 'extraProperties.AppUserMimicProfileId',
    }),
  );
  const AppUserOrganizationProfileId = Number(
    useWatch({
      control,
      name: 'extraProperties.AppUserOrganizationProfileId',
    }),
  );
  const AppUserOrganizationId = Number(
    useWatch({
      control,
      name: 'extraProperties.AppUserOrganizationId',
    }),
  );

  const isActive = useWatch({
    control,
    name: 'isActive',
  });
  const lockoutEnabled = useWatch({
    control,
    name: 'lockoutEnabled',
  });
  const emailConfirmed = useWatch({
    control,
    name: 'emailConfirmed',
  });
  const phoneNumberConfirmed = useWatch({
    control,
    name: 'phoneNumberConfirmed',
  });
  const shouldChangePasswordOnNextLogin = useWatch({
    control,
    name: 'shouldChangePasswordOnNextLogin',
  });

  return (
    <>
      <RegisterInput
        type={'text'}
        name={'userName'}
        label={getTranslatedValue('UserName', 'AbpIdentity.texts')}
        required={true}
        error={errors?.userName?.message}
        register={register}
        className="md:col-span-2"
      />

      <div className="user-form-content__grid">
        <RegisterInput
          type={'text'}
          name={'name'}
          label={getTranslatedValue('Name')}
          error={errors?.name?.message}
          register={register}
        />

        <RegisterInput
          type={'text'}
          name={'surname'}
          label={getTranslatedValue('Surname', 'AbpIdentity.texts')}
          error={errors?.surname?.message}
          register={register}
        />
      </div>

      {!isEdit && (
        <RegisterInput
          name={'password'}
          label={getTranslatedValue('Password', 'AbpIdentity.texts')}
          required={true}
          type={showPassword ? 'text' : 'password'}
          checkShowPasswordHandler={() => setShowPassword(!showPassword)}
          error={errors?.password?.message}
          register={register}
          className="md:col-span-2"
        />
      )}

      <RegisterInput
        type={'text'}
        name={'email'}
        label={getTranslatedValue('Email')}
        required={true}
        error={errors?.email?.message}
        register={register}
        className="md:col-span-2"
      />

      <RegisterInput
        type={'number'}
        name={'phoneNumber'}
        label={getTranslatedValue('PhoneNumber', 'AbpIdentity.texts')}
        error={errors?.phoneNumber?.message}
        register={register}
        className="md:col-span-2"
      />

      <div className="user-form-content__grid">
        <Checkbox
          checked={isActive}
          onChange={(value: any) => setValue('isActive', value)}
          label={getTranslatedValue('Active')}
          name="isActive"
        />
        <Checkbox
          checked={lockoutEnabled}
          onChange={(value: any) => setValue('lockoutEnabled', value)}
          label={getTranslatedValue(
            'DisplayName:LockoutEnabled',
            'AbpIdentity.texts',
          )}
          name="lockoutEnabled"
        />
        <Checkbox
          checked={emailConfirmed}
          onChange={(value: any) => setValue('emailConfirmed', value)}
          label={getTranslatedValue(
            'DisplayName:EmailConfirmed',
            'AbpIdentity.texts',
          )}
          name="emailConfirmed"
        />
        <Checkbox
          checked={phoneNumberConfirmed}
          onChange={(value: any) => setValue('phoneNumberConfirmed', value)}
          label={getTranslatedValue(
            'DisplayName:PhoneNumberConfirmed',
            'AbpIdentity.texts',
          )}
          name="phoneNumberConfirmed"
        />
        <Checkbox
          checked={shouldChangePasswordOnNextLogin}
          onChange={(value: any) =>
            setValue('shouldChangePasswordOnNextLogin', value)
          }
          label={getTranslatedValue(
            'DisplayName:ShouldChangePasswordOnNextLogin',
            'AbpIdentity.texts',
          )}
          name="shouldChangePasswordOnNextLogin"
        />
      </div>

      <SearchableDropdown
        name="extraProperties.AppUserMimicProfileId"
        label={getTranslatedValue('AppUserMimicProfileId')}
        searchParameterLabel={'title'}
        options={mimicProfilesLookup?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        selectedVal={
          AppUserMimicProfileId
            ? mimicProfilesLookup?.find(
                (item: any) => item.id == AppUserMimicProfileId,
              )?.displayName
            : null
        }
        placeholder={getTranslatedValue('Search')}
        handleChange={(e: any) => {
          setValue('extraProperties.AppUserMimicProfileId', parseInt(e));
          setValue(
            'extraProperties.AppUserMimicProfileId_Text',
            mimicProfilesLookup?.find((item: any) => item.id == e)?.displayName,
          );
        }}
        isRequiredInput
        isLoading={false}
        error={errors?.extraProperties?.AppUserMimicProfileId?.message}
      />

      <SearchableDropdown
        name="extraProperties.AppUserOrganizationProfileId"
        label={getTranslatedValue('AppUserOrganizationProfileId')}
        searchParameterLabel={'title'}
        options={userOrganizationProfileLookup?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        selectedVal={
          AppUserOrganizationProfileId
            ? userOrganizationProfileLookup?.find(
                (item: any) => item.id == AppUserOrganizationProfileId,
              )?.displayName
            : null
        }
        placeholder={getTranslatedValue('Search')}
        handleChange={(e: any) => {
          setValue('extraProperties.AppUserOrganizationProfileId', parseInt(e));
          setValue(
            'extraProperties.AppUserOrganizationProfileId_Text',
            userOrganizationProfileLookup?.find((item: any) => item.id == e)
              ?.displayName,
          );
        }}
        isRequiredInput
        isLoading={false}
        error={errors?.extraProperties?.AppUserOrganizationProfileId?.message}
      />

      <SearchableDropdown
        name="extraProperties.AppUserOrganizationId"
        label={getTranslatedValue('AppUserOrganizationId')}
        searchParameterLabel={'title'}
        options={organizationLookup?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        selectedVal={
          AppUserOrganizationId
            ? organizationLookup?.find(
                (item: any) => item.id == AppUserOrganizationId,
              )?.displayName
            : null
        }
        placeholder={getTranslatedValue('Search')}
        handleChange={(e: any) => {
          setValue('extraProperties.AppUserOrganizationId', parseInt(e));
          setValue(
            'extraProperties.AppUserOrganizationId_Text',
            organizationLookup?.find((item: any) => item.id == e)?.displayName,
          );
        }}
        isRequiredInput
        isLoading={false}
        error={errors?.extraProperties?.AppUserOrganizationId?.message}
      />
    </>
  );
};

const UserInformation = memo(MemoUserInformation);

export default UserInformation;

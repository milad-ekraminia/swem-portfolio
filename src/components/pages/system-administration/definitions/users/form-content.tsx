import Tabs from '@/components/ui/tabs/tabs';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import UserInformation from './user-information';
import UserRoles from './user-roles';

export const UserFormContent = ({
  errors,
  register,
  control,
  setValue,
  userOrganizationProfileLookup,
  mimicProfilesLookup,
  organizationLookup,
  assignableRolesList,
  isEdit = false,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  userOrganizationProfileLookup: any;
  mimicProfilesLookup: any;
  organizationLookup: any;
  assignableRolesList: any;
  isEdit?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<string>('userInformation');

  const roleNames = useWatch({
    control,
    name: 'roleNames',
  });

  return (
    <div className="user-form-content">
      <div className="user-form-content__tabs">
        <Tabs
          tabs={[
            {
              title: getTranslatedValue(
                'UserInformations',
                'AbpIdentity.texts',
              ),
              value: 'userInformation',
            },
            {
              title: `${getTranslatedValue('Roles', 'AbpIdentity.texts')} (${roleNames?.length ?? 0})`,
              permission: 'AbpIdentity.Users.Update.ManageRoles',
              value: 'roles',
            },
          ]}
          activeTab={activeTab}
          onTabClick={(v) => {
            setActiveTab(v);
          }}
        />
      </div>

      {activeTab === 'userInformation' ? (
        <UserInformation
          errors={errors}
          register={register}
          control={control}
          setValue={setValue}
          userOrganizationProfileLookup={userOrganizationProfileLookup}
          mimicProfilesLookup={mimicProfilesLookup}
          organizationLookup={organizationLookup}
          isEdit={isEdit}
        />
      ) : activeTab === 'roles' ? (
        <UserRoles
          assignableRolesList={assignableRolesList}
          control={control}
          setValue={setValue}
        />
      ) : activeTab === 'organizationUnits' ? (
        <></>
      ) : (
        <></>
      )}
    </div>
  );
};

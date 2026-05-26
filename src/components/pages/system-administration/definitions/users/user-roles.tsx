import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useWatch } from 'react-hook-form';
import { Checkbox } from '@/components/ui/input/check-box/check-box';

const MemoUserRoles = ({
  assignableRolesList,
  control,
  setValue,
}: {
  assignableRolesList: any;
  control: any;
  setValue: any;
}) => {
  const roleNames = useWatch({
    control,
    name: 'roleNames',
  });

  const handleToggle = (role: any) => {
    const index = roleNames.indexOf(role.name);

    if (index === -1) {
      setValue('roleNames', [...roleNames, role.name]);
    } else {
      setValue(
        'roleNames',
        roleNames.filter((roleName: any) => roleName !== role.name),
      );
    }
  };

  return (
    <div className="user-form-content__roles">
      {assignableRolesList?.map((role: any) => (
        <Checkbox
          key={role.id}
          checked={roleNames.includes(role.name)}
          onChange={() => handleToggle(role)}
          label={getTranslatedValue(role.name)}
        />
      ))}
    </div>
  );
};

const UserRoles = memo(MemoUserRoles);

export default UserRoles;

import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Input } from '@/components/ui/input/Input';

const ProfileModal = ({
  currentUser,
}: {
  currentUser?: {
    name: string;
    userName: string;
    email: string;
    roles: string[];
  };
}) => {
  return (
    <div className="profile-modal">
      <Input label="Adı - Soyadı" disabled={true} value={currentUser?.name} />
      <Input
        label={getTranslatedValue('kmlm_user_email')}
        disabled={true}
        value={currentUser?.email}
      />
      <Input
        label={getTranslatedValue('mobile_lang_user_name')}
        disabled={true}
        value={currentUser?.userName}
      />
      <Input
        label="Kullanıcı Rolü" // TODO: get from backend
        disabled={true}
        value={currentUser?.roles?.join(', ')}
      />
      {/* TODO: get from backend */}
      {/* <TextArea
        label={getTranslatedValue("em_modbus_table_unit")}
        value={"Diyarbakır - Merkez, Batman - Merkez"}
        disabled={true}
      /> */}
    </div>
  );
};

export default ProfileModal;

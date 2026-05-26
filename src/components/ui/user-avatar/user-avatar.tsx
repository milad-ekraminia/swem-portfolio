import { getClassNames } from '@/helpers/get-class-names';
import Image from '../image/image';

interface UserAvatarProps {
  isExpanded: boolean;
  currentUser?: {
    name: string;
    userName: string;
    id: string;
    email: string;
  };
}
const UserAvatar = ({ isExpanded, currentUser }: UserAvatarProps) => {
  return (
    <div className={getClassNames('user-profile', [[isExpanded, 'expanded']])}>
      {/* <div className="user-profile__avatar"></div> */}
      <Image
        src={`${import.meta.env.VITE_API_AUTHENTICATION_URL}api/account/profile-picture-file/${currentUser?.id}`}
        alt={currentUser?.userName}
      />
      <div
        className={getClassNames('user-profile__details', [
          [isExpanded, 'expanded'],
        ])}
      >
        <h4>{currentUser?.name}</h4>
        <p>{currentUser?.email}</p>
      </div>
      <div
        className={getClassNames('user-profile__signout', [
          [isExpanded, 'expanded'],
        ])}
      >
        {/* <SignOutSvg /> */}
      </div>
    </div>
  );
};

export default UserAvatar;

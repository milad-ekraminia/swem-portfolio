import { memo } from 'react';
import { dateFormatter } from '@/helpers/format-data';

const MemoUserHasUpdatedFiledName = ({
  fullName,
  dateTime,
}: {
  fullName: string;
  dateTime: string | null;
}) => {
  return (
    <>
      {dateTime ? (
        <>
          {fullName || '- - -'} - {dateFormatter(dateTime?.split('T')[0])}&nbsp;
          {dateTime?.split('T')[1].split('.')[0]}
        </>
      ) : (
        fullName || '- - -'
      )}
    </>
  );
};

const UserHasUpdatedFiledName = memo(MemoUserHasUpdatedFiledName);

export default UserHasUpdatedFiledName;

import { memo } from 'react';
import { CloseSvg } from '@/assets/icons/close-svg';
import { ImageSvg } from '@/assets/icons/image-svg';
import { KeyholeSvg } from '@/assets/icons/keyhole-svg';
import { MoveUserSvg } from '@/assets/icons/move-user';
import { UnlockSvg } from '@/assets/icons/unlock-svg';
import { UserPlusSvg } from '@/assets/icons/user-plus-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  Edit2,
  EyeIcon,
  FunnelIcon,
  KeyRound,
  PlusCircle,
  Save,
  Settings2,
  Undo2,
  Upload,
  Zap,
} from 'lucide-react';

const MemoModalHeader = ({
  isEdit = false,
  isFunnel = false,
  isTransfer = false,
  isConsumable = false,
  label,
  isUpload = false,
  isSave = false,
  isPreview = false,
  isImage = false,
  isUserAdd = false,
  isKey = false,
  isLock = false,
  isUserMove = false,
  isUnLock = false,
  isSetting = false,
  isAuditLogs = false,
  setShowModal,
}: {
  isEdit?: boolean;
  isFunnel?: boolean;
  isTransfer?: boolean;
  isConsumable?: boolean;
  isPreview?: boolean;
  isImage?: boolean;
  isUserAdd?: boolean;
  isUpload?: boolean;
  isSave?: boolean;
  isKey?: boolean;
  isLock?: boolean;
  isUnLock?: boolean;
  isUserMove?: boolean;
  isSetting?: boolean;
  isAuditLogs?: boolean;
  label: string;
  setShowModal: (data: boolean) => void;
}) => {
  return (
    <div className="global-modal__header">
      <div>
        <div className="global-modal__header-icon">
          {isFunnel ? (
            <FunnelIcon color="var(--brand-600)" width="24" height="24" />
          ) : isEdit ? (
            <Edit2 color="var(--brand-600)" width="24" height="24" />
          ) : isTransfer ? (
            <Undo2 color="var(--brand-600)" width="24" height="24" />
          ) : isConsumable ? (
            <Zap color="var(--brand-600)" width="24" height="24" />
          ) : isPreview ? (
            <EyeIcon color="var(--brand-600)" width="24" height="24" />
          ) : isImage ? (
            <ImageSvg stroke="var(--brand-600)" />
          ) : isUserAdd ? (
            <UserPlusSvg stroke="var(--brand-600)" />
          ) : isUpload ? (
            <Upload stroke={'var(--brand-600)'} />
          ) : isSave ? (
            <Save stroke="var(--brand-600)" />
          ) : isKey ? (
            <KeyRound stroke="var(--brand-600)" />
          ) : isLock ? (
            <KeyholeSvg stroke="var(--brand-600)" width="28" height="28" />
          ) : isUnLock ? (
            <UnlockSvg stroke="var(--brand-600)" width="28" height="28" />
          ) : isUserMove ? (
            <MoveUserSvg stroke="var(--brand-600)" width="28" height="28" />
          ) : isSetting ? (
            <Settings2 stroke="var(--brand-600)" width="28" height="28" />
          ) : isAuditLogs ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
            >
              <path
                d="M1 7H13M1 1H19M1 13H19"
                stroke="var(--brand-600)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <PlusCircle color="var(--brand-600)" width="24" height="24" />
          )}
        </div>
        <div className="global-modal__header-title">
          {getTranslatedValue(label)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setShowModal(false);
        }}
      >
        <CloseSvg />
      </button>
    </div>
  );
};

const ModalHeader = memo(MemoModalHeader);

export default ModalHeader;

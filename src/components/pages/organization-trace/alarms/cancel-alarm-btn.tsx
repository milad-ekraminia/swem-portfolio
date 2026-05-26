import { getTranslatedValue } from '@/helpers/get-translated-value';

export default function CancelAlarmButton({
  setShowSureModal,
}: {
  readonly setShowSureModal: any;
}) {
  return (
    <button
      className="cancel-alarm-btn"
      onClick={() => setShowSureModal(true)}
      type="button"
    >
      {getTranslatedValue('End')}
    </button>
  );
}

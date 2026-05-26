import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';

export default function ApproveAlarmButton({
  isPending,
  setShowSureModal,
}: Readonly<{
  setShowSureModal: any;
  isPending: any;
}>) {
  return (
    <button
      className="approve-alarm-btn"
      onClick={() => setShowSureModal(true)}
      type="button"
      disabled={isPending}
    >
      {isPending ? <ComponentLoader /> : getTranslatedValue('Approve')}
    </button>
  );
}

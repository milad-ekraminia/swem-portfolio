import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Button } from '@/components/ui/button/button';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';

const NewEditModalAction = ({
  level,
  setLevel,
  isLoading,
  trigger,
  onSubmit,
  setShowModal,
}: {
  level: number;
  setLevel: (value: number) => void;
  isLoading: boolean;
  trigger: any;
  onSubmit: VoidFunction;
  setShowModal: (value: any) => void;
}) => {
  return (
    <>
      <Button
        variant="secondary"
        type="button"
        onClick={() => {
          if (level === 0) {
            setShowModal(false);
          } else {
            setLevel(0);
          }
        }}
      >
        {level == 0 ? getTranslatedValue('Cancel') : getTranslatedValue('back')}
      </Button>
      <Button
        type="button" // ⛔ prevent default form submit
        variant="primary"
        disabled={isLoading}
        onClick={async () => {
          if (level === 0) {
            const isValid = await trigger([
              'alarmConfDescription',
              'alarmConfDeviceId',
              'alarmConfLabelId',
              'alarmConfDeviceIds',
            ]);
            if (isValid) {
              setLevel(1);
            } else {
              toastError(getTranslatedValue('PleaseFillRequiredFields'));
            }
          } else if (level === 1) {
            onSubmit();
          }
        }}
      >
        {level == 0 ? (
          getTranslatedValue('Next')
        ) : isLoading ? (
          <ComponentLoader variant="secondary" />
        ) : (
          getTranslatedValue('save')
        )}
      </Button>
    </>
  );
};

export default NewEditModalAction;

import { getTranslatedValue } from '@/helpers/get-translated-value';
import { displayNameListItemType } from '@/types/pages/definitions/multi-conditional-statuses';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import FilterSubmitOrCancelButtons from './filter-submit-or-cancel-button';
import WorkOrderFilterFormContent from './form-content';

const WorkOrderFilterModal = ({
  setIsVisible,
  notificationTypeLookup,
  userLookup,
  categoryLookup,
  // workOrderInfo,
  register,
  handleSubmit,
  setValue,
  reset,
  control,
  onSubmit,
  setShowFunnelModal,
  isLoading,
}: {
  setIsVisible: (value: any) => void;
  notificationTypeLookup: displayNameListItemType[];
  userLookup: displayNameListItemType[];
  categoryLookup: any;
  // workOrderInfo: any;
  register: any;
  handleSubmit: any;
  reset: any;
  setShowFunnelModal: any;
  setValue: any;
  control: any;
  onSubmit: any;
  isLoading: boolean;
}) => {
  return (
    <form
      className="global-modal bys-work-orders-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader
        isEdit={false}
        label="Filter"
        setShowModal={setIsVisible}
        isFunnel
      />

      <WorkOrderFilterFormContent
        // workOrderInfo={workOrderInfo}
        errors={[]}
        register={register}
        control={control}
        setValue={setValue}
        workOrdersTypeLookup={notificationTypeLookup}
        userLookup={userLookup}
        categoryLookup={categoryLookup}
      />
      <FilterSubmitOrCancelButtons
        handleCancelForm={() => {
          setShowFunnelModal(null);
        }}
        reset={reset}
        isPending={isLoading}
        confirmButtonText={getTranslatedValue('filter')}
      />
    </form>
  );
};

export default WorkOrderFilterModal;

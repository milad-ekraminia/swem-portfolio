import { useState } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import FunnelModalContent from './funnel-modal-content';

const FunnelModal = ({
  setShowEditModal,
  setFunnelData,
  funnelData,
}: {
  setShowEditModal: any;
  setFunnelData: any;
  funnelData: { showActive: boolean; showPassive: boolean };
}) => {
  const [data, setData] = useState(funnelData);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setFunnelData(data);
    setShowEditModal(false);
  };

  return (
    <form className="global-modal" onSubmit={onSubmit}>
      <ModalHeader isFunnel label="Update" setShowModal={setShowEditModal} />
      <FunnelModalContent data={data} setData={setData} />

      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowEditModal(null);
        }}
        isPending={false}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default FunnelModal;

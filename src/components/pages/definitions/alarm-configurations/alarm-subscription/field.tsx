import DeleteModal from '@/components/ui/action/delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { AlarmSubscriptionFieldTableColumns as basicColumns } from '@/enum-data/definitions/alarm-subscription-field-table-columns';
import { fetchAppUserLookupList } from '@/services/definitions/alarm-configurations/alarm-configurations-api';
import { userAlarmConfigurationsSchemaType } from '@/validations/definitions/alarm-configurations/alarm-configurations-validation';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback, useMemo, useState } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import AlarmSubscriptionFieldFormContent from './field-form';
import { AlarmSubscriptionFieldTableHeader } from './field-table-header';

const MemoAlarmSubscriptionField = ({ control }: { control: any }) => {
  const [showAddModal, setShowAddModal] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  const { data: usersLookupResponse } = useQuery({
    queryKey: ['App User Lookup List'],
    queryFn: () => fetchAppUserLookupList(),
    retry: false,
  });

  const { append, remove } = useFieldArray<{
    userAlarmConfigurationList: userAlarmConfigurationsSchemaType[];
  }>({
    control,
    name: 'userAlarmConfigurationList',
  });

  const userAlarmConfigurationList = useWatch({
    control,
    name: 'userAlarmConfigurationList',
  });

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        usersLookupResponse,
        onDelete(row) {
          setDeleteItem(row);
        },
      }),
    [usersLookupResponse, userAlarmConfigurationList, remove],
  );

  const handleRemove = useCallback(() => {
    remove(
      (userAlarmConfigurationList || []).findIndex(
        (item: any) =>
          item.userId === deleteItem.userId &&
          item.notificationType === deleteItem.notificationType &&
          item.notificationPeriod === deleteItem.notificationPeriod,
      ),
    );
    setDeleteItem(null);
  }, [remove, userAlarmConfigurationList, deleteItem]);
  const onSubmit = (formData: any) => {
    append({
      userId: formData?.userId,
      notificationType: formData?.notificationType,
      notificationPeriod: formData?.notificationPeriod,
    });
    setShowAddModal(null);
    // reset(userAlarmConfigurationsInitialValues);
  };

  return (
    <div className="alarm-subscription-field-table-wrapper">
      <Table
        data={userAlarmConfigurationList ?? []}
        columns={memoizedBaseColumns}
        maxHeight="650px"
        isLoading={false}
        headerChildren={
          <AlarmSubscriptionFieldTableHeader setNewItem={setShowAddModal} />
        }
      />
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(null)}
          modalSize="sm"
          showCloseButton={false}
          contentStyle={{
            zIndex: 1007,
          }}
          outsideClickStyle={{
            zIndex: 1006,
          }}
        >
          <AlarmSubscriptionFieldFormContent
            onAdd={onSubmit}
            usersLookupResponse={usersLookupResponse}
            onClose={setShowAddModal}
          />
        </Modal>
      )}
      {deleteItem && (
        <Modal
          modalSize="sm"
          isOpen={Boolean(deleteItem)}
          onClose={() => setDeleteItem(null)}
          outsideClickStyle={{ zIndex: 1006 }}
          contentStyle={{ zIndex: 1007 }}
        >
          <DeleteModal
            setShowModal={() => setDeleteItem(null)}
            deleteItemHandler={() => handleRemove()}
          />
        </Modal>
      )}
    </div>
  );
};

const AlarmSubscriptionField = memo(MemoAlarmSubscriptionField);

export default AlarmSubscriptionField;

import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { RolesTableColumns as basicColumns } from '@/enum-data/system-administration/roles-table-columns';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getRolesList } from '@/services/system-administration/definitions/roles';
import { ISort } from '@/types/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { memo, useMemo, useState } from 'react';
import EditRoleModal from './edit-modal';
import MoveAllUsers from './move-all-users';
import Permissions from './permissions';

const RolesTable = ({ setNewItem }: { setNewItem?: (value: any) => void }) => {
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);

  const [editItem, setEditItem] = useState<any>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<any>(null);
  const [showMoveAllUsersModal, setShowMoveAllUsersModal] = useState<any>(null);

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        onEdit(row) {
          setEditItem(row?.original);
        },
        onPermission(row) {
          setShowPermissionsModal(row?.original);
        },
        onDelete(row) {
          setShowDeleteModal(row?.original);
        },
        onMoveAll(row) {
          setShowMoveAllUsersModal(row?.original);
        },
      }),
    [],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const {
    data,
    isLoading: isTableLoading,
    isPending,
  } = useQuery({
    queryKey: [
      'Get Roles List',
      sortData,
      searchInputValue,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      getRolesList({
        filterText: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        pageSize,
      }),
    retry: false,
  });

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedBaseColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  const searchInputHandler = (value: string) => {
    setSearchInputValue(value);
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={getPermission('AbpIdentity.Roles.Create') && setNewItem}
        label={getTranslatedValue('Roles', 'AbpIdentity.texts')}
        newButtonLabel={getTranslatedValue('NewRole', 'AbpIdentity.texts')}
        tableColumns={effectiveColumns}
        hasFilterTable={false}
      />
    ),
    [selectedColumnKeys, columnOrder, searchInputValue],
  );

  return (
    <>
      <Table
        data={data?.items ?? []}
        columns={effectiveColumns}
        maxHeight="650px"
        isLoading={isTableLoading || isPending}
        headerChildren={header}
        totalCount={data?.totalCount ?? 0}
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        lastColumnSticky
        setSorting={setSortData}
        sorting={sortData}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />

      {getPermission('AbpIdentity.Roles.Update') && editItem && (
        <Modal
          isOpen={editItem}
          onClose={() => setEditItem(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <EditRoleModal setShowModal={setEditItem} roleInfo={editItem} />
        </Modal>
      )}
      {getPermission('AbpIdentity.Roles.ManagePermissions') &&
        showPermissionsModal && (
          <Modal
            isOpen={showPermissionsModal}
            onClose={() => setShowPermissionsModal(false)}
            modalSize="md"
            showCloseButton={false}
          >
            <Permissions
              userInfo={showPermissionsModal}
              setShowModal={setShowPermissionsModal}
            />
          </Modal>
        )}
      {showMoveAllUsersModal && (
        <Modal
          isOpen={showMoveAllUsersModal}
          onClose={() => setShowMoveAllUsersModal(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <MoveAllUsers
            roleInfo={showMoveAllUsersModal}
            setShowModal={setShowMoveAllUsersModal}
          />
        </Modal>
      )}

      {getPermission('AbpIdentity.Roles.Delete') && showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <SureDeleteModal
            queryKey="Get Roles List"
            deleteItemUrl={`identity/roles/${showDeleteModal?.id.toString()}?api-version=${import.meta.env.VITE_API_VERSION}`}
            setShowModal={setShowDeleteModal}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(RolesTable);

import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { UsersTableColumns as basicColumns } from '@/enum-data/system-administration/users-table-columns';
import {
  downloadExcelFileTokenApi,
  downloadGetMethodExcelFile,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  getUsersList,
  updateUnLock,
} from '@/services/system-administration/definitions/users';
import { ISort } from '@/types/components/ui/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { memo, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import EditUserModal from './edit-modal';
import UsersFilterModal from './filter-modal';
import UserImportModal from './import-modal';
import Lock from './lock';
import Permissions from './permissions';
import SetPassword from './set-password';
import TwoFactor from './two-factor';

const UsersTable = ({
  setNewItem,
  userOrganizationProfileLookup,
  mimicProfilesLookup,
  organizationLookup,
  assignableRolesList,
  availableOrganizationUnits,
  currentUser,
}: {
  setNewItem?: (value: any) => void | undefined;
  userOrganizationProfileLookup: any;
  mimicProfilesLookup: any;
  organizationLookup: any;
  assignableRolesList: any;
  availableOrganizationUnits: any;
  currentUser: any;
}) => {
  const [filterValues, setFilterValues] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);

  const [editItem, setEditItem] = useState<any>(null);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState<any>(null);
  const [showSetPasswordModal, setShowSetPasswordModal] = useState<any>(null);
  const [showLockModal, setShowLockModal] = useState<any>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<any>(null);
  const [importModal, setImportModal] = useState<any>(null);

  const memoizedBaseColumns = useMemo(
    () =>
      basicColumns({
        currentUser,
        onEdit(row) {
          setEditItem(row?.original);
        },
        onTwoFactor(row) {
          setShowTwoFactorModal(row?.original);
        },
        onPasswordChange(row) {
          setShowSetPasswordModal(row?.original);
        },
        onLock(row) {
          setShowLockModal(row?.original);
        },
        onUnLock(row) {
          mutationUnLockUser.mutate(row?.original.id);
        },
        onPermission(row) {
          setShowPermissionsModal(row?.original);
        },
        onDelete(row) {
          setShowDeleteModal(row?.original);
        },
      }),
    [currentUser],
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
      'Get Users List',
      sortData,
      searchInputValue,
      currentPage,
      filterValues,
      pageSize,
    ],
    queryFn: () =>
      getUsersList({
        filter: searchInputValue,
        skipCount: currentPage * pageSize,
        sorting: sortData,
        pageSize,
        filterValues,
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

  const filterSubmitHandler = (data: any) => {
    setFilterValues(data);
    setCurrentPage(0);
  };

  const getTokenMutation = useMutation({
    mutationFn: downloadExcelFileTokenApi,
    onSuccess: async (data) => {
      const searchParams = new URLSearchParams();
      searchParams.append('api-version', import.meta.env.VITE_API_VERSION);
      if (filterValues) {
        Object.keys(filterValues).forEach((key) => {
          const value = (filterValues as Record<string, string | undefined>)[
            key
          ];
          if (value) {
            searchParams.append(key, value);
          }
        });
      }
      searchParams.append('filter', searchInputValue);
      searchParams.append('Token', data?.token);

      await downloadGetMethodExcelFile({
        excelUrl: `identity/users/export-as-excel?${searchParams}`,
        fileName: getTranslatedValue('Users', 'AbpIdentity.texts'),
        fileType: 'xlsx',
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const downloadHandler = () => {
    getTokenMutation.mutate({
      url: `identity/users/download-token?api-version=${import.meta.env.VITE_API_VERSION}}`,
    });
  };

  const onImport = () => {
    setImportModal(true);
  };

  const header = useMemo(
    () => (
      <GlobalTableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputHandler={searchInputHandler}
        setNewItem={getPermission('AbpIdentity.Users.Create') && setNewItem}
        handleImport={
          getPermission('AbpIdentity.Users.Import') ? onImport : undefined
        }
        isExcelDownloading={getTokenMutation.isPending}
        handleDownload={
          getPermission('AbpIdentity.Users.Export')
            ? downloadHandler
            : undefined
        }
        label={getTranslatedValue('Users', 'AbpIdentity.texts')}
        newButtonLabel={getTranslatedValue('NewUser', 'AbpIdentity.texts')}
        tableColumns={memoizedBaseColumns}
        hasFilterModal={true}
        openFilterModal={() => setShowFilterModal(true)}
      />
    ),
    [
      selectedColumnKeys,
      columnOrder,
      searchInputValue,
      getTokenMutation.isPending,
    ],
  );

  const queryClient = useQueryClient();

  const handleSuccess = async () => {
    queryClient.invalidateQueries({
      queryKey: ['Get Users List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUnLockUser = useMutation({
    mutationFn: updateUnLock,
    onSuccess: handleSuccess,
    onError: handleError,
  });

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

      {getPermission('AbpIdentity.Users.Create') && importModal && (
        <Modal
          modalSize="sm"
          isOpen={importModal}
          showCloseButton={false}
          onClose={() => setImportModal(false)}
        >
          <UserImportModal fileType="Excel" setShowModal={setImportModal} />
        </Modal>
      )}

      {getPermission('AbpIdentity.Users.Update') && editItem && (
        <Modal
          isOpen={editItem}
          onClose={() => setEditItem(false)}
          modalSize="md"
          showCloseButton={false}
        >
          <EditUserModal
            userInfo={editItem}
            setShowModal={setEditItem}
            userOrganizationProfileLookup={userOrganizationProfileLookup}
            mimicProfilesLookup={mimicProfilesLookup}
            organizationLookup={organizationLookup}
            assignableRolesList={assignableRolesList}
          // availableOrganizationUnits={availableOrganizationUnits}
          />
        </Modal>
      )}

      {showFilterModal && (
        <UsersFilterModal
          filterValues={filterValues}
          filterSubmitHandler={(filters: any) => {
            filterSubmitHandler(filters);
            setShowFilterModal(false);
          }}
          onClose={() => setShowFilterModal(false)}
          open={showFilterModal}
          availableOrganizationUnits={availableOrganizationUnits}
          roles={assignableRolesList}
        />
      )}

      {showTwoFactorModal && (
        <Modal
          isOpen={showTwoFactorModal}
          onClose={() => setShowTwoFactorModal(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <TwoFactor
            userInfo={showTwoFactorModal}
            setShowModal={setShowTwoFactorModal}
          />
        </Modal>
      )}
      {showSetPasswordModal && (
        <Modal
          isOpen={showSetPasswordModal}
          onClose={() => setShowSetPasswordModal(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <SetPassword
            userInfo={showSetPasswordModal}
            setShowModal={setShowSetPasswordModal}
          />
        </Modal>
      )}
      {showLockModal && (
        <Modal
          isOpen={showLockModal}
          onClose={() => setShowLockModal(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <Lock userInfo={showLockModal} setShowModal={setShowLockModal} />
        </Modal>
      )}

      {showPermissionsModal && (
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

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <SureDeleteModal
            queryKey="Get Users List"
            deleteItemUrl={`identity/users/${showDeleteModal?.id.toString()}?api-version=${import.meta.env.VITE_API_VERSION}`}
            setShowModal={setShowDeleteModal}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(UsersTable);

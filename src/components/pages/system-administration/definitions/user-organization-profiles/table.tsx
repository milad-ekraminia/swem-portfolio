import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { userOrganizationProfilesColumns as basicColumns } from '@/enum-data/system-administration/user-organization-profiles-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useDownloadFile } from '@/hooks/use-download-file';
import {
  getOrganizationLookUp,
  getUserOrganizationList,
  getUserOrganizationProfileDetails,
} from '@/services/system-administration/bys/user-organization-profiles';
import { ISort } from '@/types/components/ui/table';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { NewDetailsUserOrganizationProfilesModal } from './detail-add-modal';
import { UpdateDetailsUserOrganizationProfilesModal } from './detail-edit-modal';
import UpdateDeviceCategoryModal from './edit-modal';

interface Props {
  setNewItem?: (item: any) => void;
}

export const UserOrganizationProfilesTable = ({ setNewItem }: Props) => {
  // === State ===
  const [sortData, setSortData] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [expandedId, setExpandedId] = useState<any>(1);

  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [detailAddModal, setDetailAddModal] = useState<any>(null);
  const [detailEditModal, setDetailEditModal] = useState<any>(null);

  // === Columns ===
  const baseColumns = useMemo(
    () =>
      basicColumns({
        onEdit: setShowEditModal,
        setDetailAddModal,
        setDetailEditModal,
        expandedId,
      }),
    [expandedId],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    baseColumns.map((col) => col.accessorKey),
  );
  const [columnOrder, setColumnOrder] = useState<string[]>(
    baseColumns.map((col) => col.accessorKey),
  );

  const effectiveColumns = useMemo(() => {
    return selectedColumnKeys
      .map((key) => baseColumns.find((col) => col.accessorKey === key))
      .filter(Boolean) as typeof baseColumns;
  }, [selectedColumnKeys, baseColumns]);

  // === Data fetching ===
  const [userOrganizationListQuery, organizationLookUpQuery] = useQueries({
    queries: [
      {
        queryKey: [
          'Get User Organization Profiles List',
          sortData,
          searchInputValue,
          currentPage,
          pageSize,
        ],
        queryFn: () =>
          getUserOrganizationList({
            filterText: searchInputValue,
            skipCount: currentPage * pageSize,
            sorting: sortData,
            maxResultCount: pageSize,
          }),
        retry: false,
      },
      {
        queryKey: ['Organization Lookup'],
        queryFn: getOrganizationLookUp,
        retry: false,
      },
    ],
  });

  const { data, isLoading } = userOrganizationListQuery;
  const { data: organizationLookUp } = organizationLookUpQuery;

  const { data: detail } = useQuery({
    queryKey: ['Get User Organization Profile Details', expandedId],
    queryFn: () =>
      getUserOrganizationProfileDetails({
        id: expandedId,
        maxResultCount: 1000,
      }),
    retry: false,
  });

  // === Table Data State ===
  const [tableData, setTableData] = useState<any>(data?.items ?? []);
  useEffect(() => {
    if (!data?.items) return;

    const updatedItems = data.items.map((item: any) => {
      if (item.id === expandedId) {
        return {
          ...item,
          children: detail?.items?.length
            ? detail.items
            : [{ organization: { organizationName: '-' }, id: 0 }],
        };
      }
      if (item.children?.[0]?.organization) {
        return item;
      }
      return {
        ...item,
        children: [{ organization: { organizationName: '-' }, id: 0 }],
      };
    });

    // Replace previous data with updated items from current page
    setTableData(updatedItems);
  }, [data, detail, expandedId]);

  // === Handlers ===
  const searchInputHandler = (value: string) => setSearchInputValue(value);

  const { isExcelDownloading, downloadHandler } = useDownloadFile();

  const handleDownload = () => {
    downloadHandler({
      excelUrl: `app/user-organization-profiles/as-excel-file`,
      fileName: getTranslatedValue('UserOrganizationProfiles', 'WebNet.texts'),
      searchInputValue,
      getTokenUrl: `app/user-organization-profiles/download-token?api-version=${import.meta.env.VITE_API_VERSION
        }`,
    });
  };

  // === Header ===
  const header = useMemo(() => {
    return (
      <GlobalTableHeader
        searchInputHandler={searchInputHandler}
        setNewItem={setNewItem}
        handleDownload={handleDownload}
        isExcelDownloading={isExcelDownloading}
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        label="UserOrganizationProfiles"
        tableColumns={baseColumns}
        newButtonLabel="NewUserOrganizationProfile"
        hasFilterTable={false}
      />
    );
  }, [
    setNewItem,
    handleDownload,
    isExcelDownloading,
    selectedColumnKeys,
    columnOrder,
    baseColumns,
  ]);

  // === Render ===
  return (
    <>
      <Table
        data={tableData}
        columns={effectiveColumns}
        maxHeight="67dvh"
        isLoading={isLoading}
        headerChildren={header}
        lastColumnSticky
        onExpand={setExpandedId}
        pageChangeHandler={setCurrentPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setSorting={setSortData}
        sorting={sortData}
        totalCount={data?.totalCount ?? 0}
        setPageSize={setPageSize}
        pageSize={pageSize}
        singleExpand={true}
      />

      {getPermission('WebNet.UserOrganizationProfiles.Edit') &&
        showEditModal && (
          <Modal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(null)}
            modalSize="sm"
            showCloseButton={false}
          >
            <UpdateDeviceCategoryModal
              onClose={() => setShowEditModal(false)}
              info={showEditModal}
            />
          </Modal>
        )}

      {getPermission('WebNet.UserOrganizationProfiles.Create') &&
        detailAddModal && (
          <Modal
            isOpen={detailAddModal}
            onClose={() => setDetailAddModal(null)}
            modalSize="sm"
            showCloseButton={false}
          >
            <NewDetailsUserOrganizationProfilesModal
              onClose={() => setDetailAddModal(false)}
              expandedId={expandedId}
              info={detailAddModal}
              organizationLookUp={organizationLookUp}
            />
          </Modal>
        )}

      {getPermission('WebNet.UserOrganizationProfileDetails') &&
        detailEditModal && (
          <Modal
            isOpen={detailEditModal}
            onClose={() => setDetailEditModal(null)}
            modalSize="sm"
            showCloseButton={false}
          >
            <UpdateDetailsUserOrganizationProfilesModal
              onClose={() => setDetailEditModal(false)}
              info={detailEditModal}
              expandedId={expandedId}
              organizationLookUp={organizationLookUp}
            />
          </Modal>
        )}
    </>
  );
};

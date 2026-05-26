import Table from '@/components/ui/table/table';
import { organizationsTableColumns as baseColumns } from '@/enum-data/definitions/organizations-data';
import { getPermission } from '@/helpers/get-permission-helper';
import {
  fetchOneOrganization,
  fetchSearchedOrganizations,
  fetchSubOrganizations
} from '@/services/definitions/organizations/organizations-api';
import { fetchUserOrganizationId } from '@/services/organization-trace';
import { handleChangeOrgId } from '@/store/features/definitions-slice';
import { ISort } from '@/types/components/ui/table';
import {
  BreadCrumbInfoProps,
  organizationsTableProps,
} from '@/types/pages/definitions/organizations.type';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateOrganizationModal from './edit-modal';
import TableHeader from './table-header';

export const MemoOrganizationsTable = ({
  ng,
  re,
  activeTab,
  setNewItem,
}: organizationsTableProps) => {
  const dispatch = useDispatch();
  const { org_id } = useSelector((state: any) => state?.orgId?.info);

  const [sorting, setSorting] = useState<ISort>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [breadCrumbInfo, setBreadCrumbInfo] = useState<BreadCrumbInfoProps[]>(
    [],
  );

  const updateHandler = (row: any) => {
    setShowEditModal(row);
  };

  const handleChangeSubOrgId = (label: string, id: number) => {
    setSearchInputValue(''); // reset search input value
    setCurrentPage(0); // reset to first page when changing organization
    dispatch(
      handleChangeOrgId({
        org_id: id,
      }),
    );

    setBreadCrumbInfo((prev) => {
      const list = prev ? [...prev] : [];

      const index = list.findIndex((breadcrumb) => breadcrumb.id === id);

      if (index !== -1) {
        return list.slice(0, index + 1);
      }

      return [
        ...list,
        {
          label,
          id,
        },
      ];
    });
  };

  const memoizedBaseColumns = useMemo(
    () =>
      baseColumns({
        // deviceModelResponse,
        // organizationResponse,
        // deviceCategoryResponse,
        // deviceAccessPointResponse,
        updateHandler,
        handleChangeSubOrgId,
        queryKey: 'sub organizations',
      }),
    [],
  );

  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    memoizedBaseColumns.map((col) => col.accessorKey),
  );

  const effectiveColumns = useMemo(() => {
    return columnOrder
      .filter((accessorKey) => selectedColumnKeys.includes(accessorKey))
      .map((accessorKey) =>
        memoizedBaseColumns.find((col) => col.accessorKey === accessorKey),
      )
      .filter(Boolean) as typeof memoizedBaseColumns;
  }, [columnOrder, selectedColumnKeys, memoizedBaseColumns]);

  // const results = useQueries({
  //   queries: [
  //     {
  //       queryKey: [
  //         'All Organizations',
  //         searchInputValue,
  //         org_id,
  //         currentPage,
  //         sorting,
  //         activeTab,
  //         pageSize,
  //       ],
  //       queryFn: () =>
  //         fetchSearchedOrganizations({
  //           filterText: searchInputValue,
  //           OrganizationParentId: org_id,
  //           skipCount: currentPage * pageSize,
  //           sorting,
  //         }),
  //       retry: false,
  //       enabled: !!searchInputValue,
  //     },
  //     {
  //       queryKey: ['initial organization id'],
  //       queryFn: () => fetchOrganizationId(),
  //       retry: false,
  //     },
  //     // {
  //     //     queryKey: ["one organization"],
  //     //     queryFn: () =>
  //     //         fetchOneOrganization({
  //     //             initialOrgId: userOrgId,
  //     //         }),
  //     //     retry: false,
  //     //     enabled: !!userOrgId,
  //     // },
  //   ],
  // });

  // fetch user organization ids
  const { data: orgIds } = useQuery({
    queryKey: ['app-user-organization-ids'],
    queryFn: () => fetchUserOrganizationId(),
    retry: false,
  });

  // fetch one organization
  const { data: oneOrganizationData, isSuccess: oneOrganizationIsSuccess } = useQuery({
    queryKey: ['one organization', orgIds?.[0]],
    queryFn: () => fetchOneOrganization({ initialOrgId: orgIds?.[0] }),
    retry: false,
    enabled: !!orgIds?.[0],
  });


  const { data: searchedOrganizationsResultData, isLoading: searchedOrganizationsResultLoading } = useQuery({
    queryKey: [
      'All Organizations',
      searchInputValue,
      org_id,
      currentPage,
      sorting,
      activeTab,
      pageSize,
    ],
    queryFn: () =>
      fetchSearchedOrganizations({
        filterText: searchInputValue,
        OrganizationParentId: org_id,
        skipCount: currentPage * pageSize,
        sorting,
      }),
    retry: false,
    enabled: !!searchInputValue,
  });

  // const [searchedOrganizationsResult, appUserOrganizationIdResult] = results;

  const { data: subOrganizationsData, isLoading } = useQuery({
    queryKey: ['sub organizations', org_id, currentPage, sorting, pageSize],
    queryFn: () =>
      fetchSubOrganizations({
        OrganizationParentId: org_id,
        skipCount: currentPage * pageSize,
        sorting,
      }),
    retry: false,
    enabled: !!org_id,
  });

  useEffect(() => {
    if (oneOrganizationIsSuccess && oneOrganizationData) {
      setCurrentPage(0); // reset to first page when initial organization is loaded
      dispatch(
        handleChangeOrgId({
          org_id: oneOrganizationData.id,
        }),
      );
      setBreadCrumbInfo([
        {
          label: oneOrganizationData.organizationName,
          id: oneOrganizationData.id,
        },
      ]);
    }
  }, [oneOrganizationIsSuccess, oneOrganizationData, dispatch]);

  const handleBackOrg = (item: { label: string; id: number }) => {
    const { id } = item;
    const index = breadCrumbInfo.findIndex(
      (breadcrumb) => breadcrumb.id === id,
    );
    if (index !== -1) {
      const newList = breadCrumbInfo.slice(0, index + 1);
      setCurrentPage(0); // reset to first page when navigating back
      dispatch(handleChangeOrgId({ org_id: id }));
      setBreadCrumbInfo(newList);
    }
  };

  const searchInputHandler = (value: string) => {
    setSearchInputValue(value);
  };

  const header = useMemo(
    () => (
      <TableHeader
        setSelectedColumnKeys={setSelectedColumnKeys}
        selectedColumnKeys={selectedColumnKeys}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        searchInputValue={searchInputValue}
        searchInputHandler={searchInputHandler}
        setNewItem={getPermission('WebNet.Organizations.Create') && setNewItem}
        breadCrumbInfo={breadCrumbInfo}
        handleClick={handleBackOrg}
        handleChangeSubOrgId={handleChangeSubOrgId}
        queryKey="sub organizations"
        updateHandler={updateHandler}
      />
    ),
    [
      selectedColumnKeys,
      columnOrder,
      searchInputValue,
      showEditModal,
      breadCrumbInfo,
    ],
  );

  return (
    <>
      <Table
        data={
          searchInputValue
            ? (searchedOrganizationsResultData?.items ?? [])
            : (subOrganizationsData?.items ?? [])
        }
        columns={effectiveColumns}
        isLoading={
          searchedOrganizationsResultLoading ||
          isLoading
          // ||
          // OneOrganizationIsLoading
        }
        headerChildren={header}
        hasPagination={true}
        totalCount={
          searchInputValue
            ? (searchedOrganizationsResultData?.totalCount ?? 0)
            : (subOrganizationsData?.totalCount ?? 0)
        }
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastColumnSticky={false}
        setSorting={setSorting}
        sorting={sorting}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />

      {getPermission('WebNet.Organizations.Edit') && showEditModal && (
        <UpdateOrganizationModal
          ng={ng}
          re={re}
          setIsVisible={setShowEditModal}
          organizationInfo={showEditModal}
        />
      )}
    </>
  );
};

const OrganizationsTable = memo(MemoOrganizationsTable);

export default OrganizationsTable;

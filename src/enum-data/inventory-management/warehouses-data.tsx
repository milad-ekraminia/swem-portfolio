import ActionsDropdown from '@/components/pages/inventory-management/warehouses/warehouse-actions-dropdown';
import StatusTagCircle from '@/components/ui/status-tag-circle.tsx/status-tag-circle';
import StatusTag from '@/components/ui/status-tag/status-tag';
import { formatDate } from '@/helpers/format-data';
import {
  getEnumOptions,
  getStationTypeEnumOptionsByCondition,
} from '@/helpers/get-enum-options';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { Check, X } from 'lucide-react';

export const wareHousesBreadcrumbs: BreadcrumbItem[] = [];

export const wareHousesTitle = {
  label: 'Warehouses',
  href: `/inventory-management/warehouses`,
};

export const wareHousesTableColumns = () => [
  {
    header: getTranslatedValue('Name'),
    accessorKey: 'warehouse.name',
    sort: 'Warehouse.Name',
    size: 250,
  },
  {
    header: getTranslatedValue('MainWarehouse'),
    accessorKey: 'warehouse1.name',
    sort: 'Warehouse1.Name',
    size: 200,
    cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.warehouse1?.name ||
            getTranslatedValue('MainWarehouse')}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('Address'),
    accessorKey: 'warehouse.address',
    sort: 'Warehouse.Address',
    size: 250,
  },
  {
    header: getTranslatedValue('IsDiscard'),
    accessorKey: 'warehouse.isDiscard',
    sort: 'Warehouse.IsDiscard',
    size: 120,
    cell: ({ row }: any) => {
      const color = row?.original?.warehouse?.isDiscard ? 'orange' : 'success';

      return (
        <StatusTagCircle
          color={color}
          label={
            row?.original?.warehouse?.isDiscard ? (
              <X size={14} color="red" />
            ) : (
              <Check size={14} color="green" />
            )
          }
        />
      );
    },
  },
  {
    header: getTranslatedValue('Status'),
    accessorKey: 'warehouse.status',
    sort: 'Warehouse.Status',
    size: 120,
    cell: ({ row }: any) => {
      const color = row?.original?.warehouse?.status ? 'success' : 'orange';
      return (
        <StatusTag
          color={color}
          label={
            row?.original?.warehouse?.status
              ? getTranslatedValue('Active')
              : getTranslatedValue('Passive')
          }
        />
      );
    },
  },
  {
    header: getTranslatedValue('Coordinate'),
    accessorKey: 'warehouse.coordinate',
    sort: 'Warehouse.Coordinate',
    size: 180,
    cell: ({ row }: any) => {
      return <>{row?.original?.warehouse?.coordinate || '- - -'}</>;
    },
  },
  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    size: 200,
    cell: ({ row }: any) => {
      return (
        <ActionsDropdown
          havePermissionSetup
          deletePermission={getPermission('WebNet.Warehouses.Delete')}
          editPermission={getPermission('WebNet.Warehouses.Edit')}
          haveInventoriesPermission={getPermission('WebNet.Inventories')}
          id={row?.original?.warehouse?.id}
        />
      );
    },
  },
];
export const wareHousesTransferRecordsTableColumns = () => [
  {
    header: getTranslatedValue('record'),
    accessorKey: 'stockChange.description',
    sort: 'stockChange.record',
    size: 800,
    cell: ({ row }: any) => {
      return (
        <div className="transfer-description">
          <div
            aria-label="transfer-indicator"
            className={`transfer-indicator ${row?.original?.stockChange?.transferCode.includes('Input')
              ? 'input'
              : 'output'
              }`}
          >
            <div className="indicator-dot" />
          </div>
          &nbsp;
          <span>{row?.original?.stockChange?.description}</span>
        </div>
      );
    },
  },
  {
    header: getTranslatedValue('Date'),
    accessorKey: 'stockChange.creationTime',
    sort: '',
    size: 900,
    cell: ({ row }: any) => {
      const creationTime = row?.original?.stockChange?.creationTime;
      return <>{formatDate(creationTime)}</>;
    },
  },
];
export const wareHousesInventoryListTableColumns = () => [
  {
    header: getTranslatedValue('Name'),
    accessorKey: 'product.productName',
    sort: 'product.productName',
    size: 800,
    cell: ({ row }: any) => {
      return (
        <div className="transfer-description">
          <span>{row?.original?.product?.productName}</span>
        </div>
      );
    },
  },
  {
    header: getTranslatedValue('Amount'),
    accessorKey: 'inventory.amount',
    sort: 'inventory.amount',
    size: 900,
    cell: ({ row }: any) => {
      return <>{row?.original?.inventory?.amount}</>;
    },
  },
];

enum wareHousestationNgSourceType {
  PipingGas = 1,
  CNG = 2,
}

enum wareHousestationType {
  RmsA = 1,
  RmsB = 2,
  RmsC = 3,
  CustomerStation = 4,
  VirtualStation = 5,
}

enum wareHousestationType2 {
  Empty = 0,
  FreeConsumer1 = 1,
  FreeConsumer2 = 2,
  Conduction = 3,
  Electricity = 4,
  DistrictRegulator = 5,
  CustomerStation = 6,
  VirtualStation = 7,
  StationNotIncludedInBalanceCalculation = 8,
}

export enum OrganizationType {
  Company = 0,
  BusinessTownDistrict = 1,
  Station = 2,
  RenewablePowerPlant = 3,
  RenewablePowerPlantPartialPlanthole = 4,
  System = 5,
}

enum PlantEnergyType {
  SunLand = 1,
  Wind = 2,
  Hydro = 3,
  SunRoof = 4,
}

export const wareHousestationNgSourceTypeOptions = getEnumOptions(
  wareHousestationNgSourceType,
);
export const wareHousestationTypeOptions =
  getStationTypeEnumOptionsByCondition(wareHousestationType);
export const wareHousestationType2Options = getEnumOptions(
  wareHousestationType2,
);
export const organizationTypeOptions = getEnumOptions(OrganizationType);
export const plantEnergyTypeOptions = getEnumOptions(PlantEnergyType);

export const calculationMethodOptions = [
  {
    value: 0,
    title: getTranslatedValue('CalculationMethod0Info'),
  },
  {
    value: 1,
    title: getTranslatedValue('CalculationMethod1Info'),
  },
  {
    value: 2,
    title: getTranslatedValue('CalculationMethod2Info'),
  },
  {
    value: 3,
    title: getTranslatedValue('CalculationMethod3Info'),
  },
];

export const defaultDataParams = {
  SkipCount: 0,
  MaxResultCount: 1000,
  'api-version': import.meta.env.VITE_API_VERSION,
};

export const multiConditionalDefaultDataParams = {
  SkipCount: 0,
  MaxResultCount: 1000,
  'api-version': import.meta.env.VITE_API_VERSION,
  Filter: '',
};

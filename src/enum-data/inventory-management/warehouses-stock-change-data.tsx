import { getEnumOptions, getStationTypeEnumOptionsByCondition } from '@/helpers/get-enum-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';


export const wareHousesBreadcrumbs: BreadcrumbItem[] = [];

export const wareHousesTitle = {
  label: 'Warehouses',
  href: `/inventory-management/warehouses`,
};

export const stockChangeTableColumns = () => [
  {
    header: getTranslatedValue('Description'),
    accessorKey: 'stockChange.description',
    sort: 'StockChange.Description',
    size: 300,
  },
  {
    header: getTranslatedValue('Amount'),
    accessorKey: 'stockChange.amount',
    sort: 'StockChange.Amount',
  },
  {
    header: getTranslatedValue('Transfer Code'),
    accessorKey: 'stockChange.transferCode',
    sort: 'StockChange.TransferCode',
    size: 300,
    cell: ({ row }: { row: any }) => {
      const info = row?.original;
      return (
        <>
          {getTranslatedValue(
            `Enum:TransferCode.${info?.stockChange?.transferCode}`,
          )}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('Warehouse'),
    accessorKey: 'warehouse.name',
    sort: 'Warehouse.Name',
    size: 200,
  },
  {
    header: getTranslatedValue('Inventory'),
    accessorKey: 'inventory.serialNumber',
    sort: 'Inventory.SerialNumber',
    size: 200,
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
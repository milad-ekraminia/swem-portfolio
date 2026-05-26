import { getCookie } from '@/helpers/cookies';
import {
  getEnumOptions,
  getStationTypeEnumOptionsByCondition,
} from '@/helpers/get-enum-options';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import ActionButtons from '@/components/ui/action/action-buttons';

export const organizationsBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Menu:Definitions', href: '' },
  { label: 'Menu:Organizations', href: '/definitions/organizations' },
];

export const organizationsTitle = {
  label: 'Menu:Organizations',
  href: `/definitions/organizations`,
};

export const organizationsTableColumns = ({
  handleChangeSubOrgId,
  queryKey,
  updateHandler,
}: {
  handleChangeSubOrgId: (name: string, id: number) => void;
  queryKey: string;
  updateHandler: (item: any) => void;
}) => [
  {
    header: getTranslatedValue('OrganizationName'),
    accessorKey: 'organizationName',
    sort: 'OrganizationName',
    size: 300,
  },
  {
    header: getTranslatedValue('OrganizationDescription'),
    accessorKey: 'organizationDescription',
    sort: 'OrganizationDescription',
    size: 200,
  },
  {
    header: getTranslatedValue('em_view_sub_organization'),
    accessorKey: 'id',
    sort: '',
    size: 200,
    cell: ({ row }: any) => {
      const isRtl = getCookie('CultureName') === 'fa';
      return (
        <button
          onClick={() =>
            handleChangeSubOrgId(
              row?.original?.organizationName,
              row?.original?.id,
            )
          }
          type="button"
          className="dv-alt-organization-link"
        >
          <span>{getTranslatedValue('em_view_sub_organization')}</span>
          {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      );
    },
  },
  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    size: 150,
    cell: ({ row }: any) => {
      return (
        <ActionButtons
          disabledEdit={!getPermission('WebNet.Organizations.Edit')}
          disabledDelete={!getPermission('WebNet.Organizations.Delete')}
          deleteUrl={`app/organizations/${row?.original?.id}?api-version=${
            import.meta.env.VITE_API_VERSION
          }`}
          updateHandler={() => updateHandler(row?.original)}
          queryKey={queryKey}
        />
      );
    },
  },
];

enum OrganizationStationNgSourceType {
  PipingGas = 1,
  CNG = 2,
}

enum OrganizationStationType {
  RmsA = 1,
  RmsB = 2,
  RmsC = 3,
  CustomerStation = 4,
  VirtualStation = 5,
}

enum OrganizationStationType2 {
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

export const organizationStationNgSourceTypeOptions = getEnumOptions(
  OrganizationStationNgSourceType,
);
export const organizationStationTypeOptions =
  getStationTypeEnumOptionsByCondition(OrganizationStationType);
export const organizationStationType2Options = getEnumOptions(
  OrganizationStationType2,
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

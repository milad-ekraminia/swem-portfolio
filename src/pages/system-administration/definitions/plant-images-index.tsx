import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import PlantImagesTable from '@/components/pages/system-administration/definitions/plant-images/table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration' },
  {
    label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('PlantImages')}`,
  },
];
const title = {
  label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('PlantImages')}`,
  href: `/system-administration/definitions/plant-images`,
};

export default function PlantImagesIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <PlantImagesTable />
      </div>
    </div>
  );
}

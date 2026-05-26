import { SingleUserSettingSvg } from '@/assets/icons/single-user-setting-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import PlantVideosTable from '@/components/pages/system-administration/definitions/plant-videos/table';

const baseBreadcrumbs: BreadcrumbItem[] = [
  { label: 'SystemAdministration' },
  {
    label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('PlantVideos')}`,
  },
];
const title = {
  label: `${getTranslatedValue('Menu:Definitions')} - ${getTranslatedValue('PlantVideos')}`,
  href: `/system-administration/definitions/plant-videos`,
};

export default function PlantVideosIndex() {
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<SingleUserSettingSvg />}
      />
      <div className="page-wrapper__body">
        <PlantVideosTable />
      </div>
    </div>
  );
}

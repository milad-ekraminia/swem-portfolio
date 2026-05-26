import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import GraphicContent from '@/components/pages/organization-trace/graphic/graphic';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';

const Graphic = () => {
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Monitoring Measurement',
    },
    {
      label: 'ChartsTrendAnalysis',
    },
  ];

  const title = {
    label: getTranslatedValue('ChartsTrendAnalysis'),
  };

  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<DefinitionsDevicesSvg />}
      />
      <div className="page-wrapper__body">
        <GraphicContent />
      </div>
    </div>
  );
};

export default Graphic;

import SolarEnergySvg from '@/assets/icons/solar-energy-svg';
import WindEnergySvg from '@/assets/icons/wind-energy-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';


export const orgTreeTabList = (activeTab: 'solar' | 'wind') => {
  
  return [
    {
      id: 1,
      title: getTranslatedValue('SolarEnergy'),
      value: 'solar',
      icon: (
        <SolarEnergySvg
          stroke={activeTab === 'solar' ? '#1570EF' : '#667085'}
        />
      ),
    },
    {
      id: 2,
      title: getTranslatedValue('WindEnergy'),
      value: 'wind',
      icon: <WindEnergySvg stroke={activeTab === 'wind' ? '#1570EF' : '#667085'} />,
    },
  ];
};
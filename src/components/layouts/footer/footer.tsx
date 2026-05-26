import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCurrentVersion } from '@/services/software-versions/software-versions';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['SoftwareVersion'],
    queryFn: () =>
      getCurrentVersion({
        skipCount: 0,
        maxResultCount: 1000,
      }),
  });
  return (
    <footer className="footer">
      <h4 className="footer__info">
        {getTranslatedValue('SolarWindEnergyManagement')}
      </h4>
      <h5 className="footer__year" onClick={() => navigate('/software-versions')}>{data?.versionTitle}</h5>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';
import { getClassNames } from '@/helpers/get-class-names';
import Image from '@/components/ui/image/image';

interface SidebarLogoProps {
  show: boolean;
}

const SidebarLogo = ({ show }: SidebarLogoProps) => {
  return (
    <Link to="/" className="sidebar__logo-link">
      <div className="sidebar__logo">
        <Image className="pic" src="/images/logo.webp" alt="logo" />
        <span className={getClassNames('title', [[show, 'show']])}>
          {import.meta.env.VITE_SITE_NAME}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLogo;


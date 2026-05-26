import { SignOutSvg } from '@/assets/icons/sign-out-svg';
import { SingleUserSvg } from '@/assets/icons/single-user-svg';
import { Button } from '@/components/ui/button/button';
import Drawer from '@/components/ui/drawer/drawer';
import { PortalDropdownWrapper } from '@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper';
import Image from '@/components/ui/image/image';
import { Loader } from '@/components/ui/loader/loader';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import Tabs from '@/components/ui/tabs/tabs';
import UserAvatar from '@/components/ui/user-avatar/user-avatar';
import { getCookie, setCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  fetchApplicationConfigurationApi,
  fetchApplicationLocalization,
} from '@/services/general/application-localization-api';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import LogoutModal from '../modal/logout';
import ProfileModal from './profile-modal';

interface SideBarDropdownProps {
  isExpanded: boolean;
}
export const SideBarDropdown = ({ isExpanded }: SideBarDropdownProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [language, setLanguage] = useState(
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string),
  );
  const [translationKey, setTranslationKey] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['application-configuration'],
    queryFn: () => fetchApplicationConfigurationApi(),
    retry: false,
  });

  const tabs = useMemo(
    () => [
      {
        id: 0,
        icon: <img src="/images/TR.svg" alt="turkish" width={24} height={24} />,
        title: '',
        active: language === 'tr',
        value: 'tr',
      },
      {
        id: 1,
        icon: <img src="/images/IR.svg" alt="iran" width={24} height={24} />,
        title: '',
        active: language === 'fa',
        value: 'fa',
      },
      {
        id: 2,
        icon: (
          <img
            src="/images/GB.svg"
            alt="united kingdom"
            width={24}
            height={24}
          />
        ),
        title: '',
        active: language === 'en',
        value: 'en',
      },
    ],
    [language],
  );

  const linkItems = [
    {
      id: 0,
      icon: <SingleUserSvg />,
      title: 'Profili görüntüle',
    },
  ];

  const changeLanguage = async (language: string) => {
    try {
      // Fetch new translations immediately
      const localizationData = await fetchApplicationLocalization({
        CultureName: language,
      });

      // Update localStorage with new translations
      if (localizationData?.resources) {
        localStorage.setItem(
          'application-localization',
          JSON.stringify(localizationData.resources),
        );
      }

      // Update language state and force re-render with new translations
      setLanguage(language);
      setCookie('CultureName', language, 86400);
      setTranslationKey((prev) => prev + 1); // Force re-render with new translations

      // Small delay to ensure the re-render happens before reload
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Error fetching translations:', error);
      // Fallback to original behavior
      setLanguage(language);
      setCookie('CultureName', language, 86400);
      window.location.reload();
    }
  };

  const dropdownContent = useMemo(
    () => (
      <div className="profile-info__dropdown">
        <div className="profile-info__dropdown-upperside">
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(true);
            }}
            leftIcon={linkItems[0]?.icon}
            className="profile-info__dropdown-button"
          >
            {linkItems[0]?.title}
          </Button>

          <Tabs
            tabs={tabs}
            activeTab={language}
            onTabClick={(tabIndex) => {
              changeLanguage(tabIndex);
            }}
          />

          {/* <div className="profile-info__dropdown-lowerside"> */}
          <div className="profile-info__dropdown-lowerside-workspace">
            <div className={`workspace-item`}>
              <div className="workspace-item-data">
                <div className="workspace-item-content">
                  <Image
                    src={`/images/logo.webp`}
                    alt={data?.currentUser?.userName}
                  />
                  {/* <img src={Somms} alt="soms" /> */}
                  <div className="workspace-item-details">
                    <span className="workspace-name">
                      {data?.currentUser?.name ?? 'Atolla Admin'}
                    </span>
                    <span className="workspace-email">
                      {data?.currentUser?.email ?? 'Atolla admin main'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <Button
            onClick={() => setShowLogout(true)}
            variant="secondary"
            leftIcon={<SignOutSvg />}
          >
            {getTranslatedValue('mobile_lang_logout_button')}
          </Button>
        </div>
      </div>
    ),
    [language, data?.currentUser, tabs, translationKey],
  );

  return (
    <>
      {isLoading ? (
        <div className="dv-profile-loader">
          <Loader />
        </div>
      ) : (
        <button className="expand-button">
          <PortalDropdownWrapper
            toggleBtn={
              <UserAvatar
                currentUser={data?.currentUser}
                isExpanded={isExpanded}
              />
            }
            closeButton={false}
            closeOnClick
          >
            {dropdownContent}
          </PortalDropdownWrapper>
        </button>
      )}

      <Drawer
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title={getTranslatedValue('accountInformation')}
        onSubmit={() => { }}
        submitBtnText={getTranslatedValue('approve')}
        closeBtnText={getTranslatedValue('cancel')}
        hasFooter={false}
      >
        <ProfileModal currentUser={data?.currentUser} />
      </Drawer>

      {showLogout && (
        <Modal isOpen={showLogout} onClose={() => setShowLogout(false)}>
          <LogoutModal setShowLogout={setShowLogout} />
        </Modal>
      )}
    </>
  );
};

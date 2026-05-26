import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Input } from '@/components/ui/input/Input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

interface Props {
  onClose: () => void;
  profile: any;
}
export default function ProfileDetail({ onClose, profile }: Props) {
  return (
    <div className="global-modal">
      <ModalHeader
        isPreview={true}
        label={profile?.title}
        setShowModal={onClose}
      />
      <div className="derived-values-form-content profile-detail">
        <Input
          name="name"
          label={getTranslatedValue('ProfileName')}
          placeholder={getTranslatedValue('ProfileName')}
          type="text"
          value={profile?.title}
        />
        <div className="profile-detail__section">
          <div className="profile-detail__section-options">
            <div className="title">
              {getTranslatedValue('SelectedGraphics')}
            </div>
            <div className="chart-type-options">
              {profile?.selectedChartTypes?.map((type: any, index: any) => (
                <div
                  key={index}
                  className={`active chart-type-options__option`}
                >
                  {getTranslatedValue(type)}
                </div>
              ))}
            </div>
          </div>
          <div className="profile-detail__section-options">
            <div className="title">
              {getTranslatedValue('SelectedGraphics')}
            </div>
            <div className="devices-list">
              {profile?.selectedDevices?.map((device: any, index: any) => (
                <div className={`devices-list__device `}>
                  <span
                    style={{ background: profile?.colors?.[index] }}
                    className="color"
                  ></span>
                  {device.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

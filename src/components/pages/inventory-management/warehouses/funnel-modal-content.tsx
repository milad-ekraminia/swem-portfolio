import Toggle from '@/components/ui/input/toggle-button/toggle';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';

const FunnelModalMemo = ({ data, setData }: { data: any; setData: any }) => {
  const isAllChecked = data?.showActive && data?.showPassive;

  const handleToggleAll = () => {
    const newValue = !isAllChecked;
    if (isAllChecked) {
      setData((prev: any) => ({
        ...prev,
        showPassive: newValue,
      }));
    } else {
      setData((prev: any) => ({
        ...prev,
        showActive: newValue,
        showPassive: newValue,
      }));
    }
  };

  const handleToggleActive = () => {
    setData((prev: any) => {
      // prevent both from being false
      if (!prev.showPassive && prev.showActive)
        return {
          ...prev,
          showActive: !prev.showActive,
          showPassive: !prev.showPassive,
        };
      return {
        ...prev,
        showActive: !prev.showActive,
      };
    });
  };

  const handleTogglePassive = () => {
    setData((prev: any) => {
      // prevent both from being false
      if (!prev.showActive && prev.showPassive)
        return {
          ...prev,
          showPassive: !prev.showPassive,
          showActive: !prev.showActive,
        };
      return {
        ...prev,
        showPassive: !prev.showPassive,
      };
    });
  };

  return (
    <div className="funnel-modal-form-content">
      <div className="funnel-modal-information-level">
        <Toggle label="Tümü" isOn={isAllChecked} setIsOn={handleToggleAll} />
        <Toggle
          label={getTranslatedValue('Active')}
          isOn={data?.showActive}
          setIsOn={handleToggleActive}
        />
        <Toggle
          label={getTranslatedValue('Passive')}
          isOn={data?.showPassive}
          setIsOn={handleTogglePassive}
        />
      </div>
    </div>
  );
};

const FunnelModalContent = memo(FunnelModalMemo);

export default FunnelModalContent;
